import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import JSZip from 'jszip';
import { MENU_SECTIONS } from '../../data/menu.data';
import { CartaKind, DRINKS_SECTIONS } from '../../data/drinks.data';
import {
  AllergenCode,
  MenuItem,
  MenuSection,
} from '../../models/menu.model';

const ALLERGEN_LIST: AllergenCode[] = [
  'gluten',
  'crustaceos',
  'huevo',
  'pescado',
  'lacteos',
  'frutosSecos',
  'mostaza',
  'moluscos',
  'soja',
  'apio',
  'sesamo',
  'altramuces',
  'sulfitos',
  'cacahuetes',
];

function cloneSections(src: MenuSection[]): MenuSection[] {
  return JSON.parse(JSON.stringify(src)) as MenuSection[];
}

function cloneJson<T>(src: T): T {
  return JSON.parse(JSON.stringify(src)) as T;
}

type EditorTab = 'precios' | 'plato' | 'categoria';

type CatalogJson = Record<string, unknown>;

function ensureItemEntry(
  root: CatalogJson,
  sectionId: string,
  index: number,
): Record<string, string> {
  const items = (root['items'] ??= {}) as Record<string, unknown>;
  const sec = (items[sectionId] ??= {}) as Record<string, unknown>;
  const key = String(index);
  const entry = (sec[key] ??= {}) as Record<string, string>;
  return entry;
}

function readItemEntry(
  root: CatalogJson | null,
  sectionId: string,
  index: number,
): Record<string, string> | undefined {
  if (!root) return undefined;
  const items = root['items'] as Record<string, unknown> | undefined;
  const sec = items?.[sectionId] as Record<string, unknown> | undefined;
  const entry = sec?.[String(index)] as Record<string, string> | undefined;
  return entry && typeof entry === 'object' ? entry : undefined;
}

function setOrDelete(entry: Record<string, string>, key: string, value: string): void {
  const t = value.trim();
  if (t) entry[key] = t;
  else delete entry[key];
}

const FOOD_FILE_HINT: Record<string, string> = {
  entrantes: 'src/app/data/menu/entrantes.json',
  salsas: 'src/app/data/menu/salsas.json',
  pescados: 'src/app/data/menu/pescados.json',
  carnes: 'src/app/data/menu/carnes.json',
  postres: 'src/app/data/menu/postres.json',
  domingos: 'src/app/data/menu/domingos.json',
  encargo: 'src/app/data/menu/encargo.json',
};

const DRINKS_FILE_HINT: Record<string, string> = {
  cocteles: 'src/app/data/drinks/cocteles.json',
  licores: 'src/app/data/drinks/licores.json',
  refrescos: 'src/app/data/drinks/refrescos.json',
  cafe: 'src/app/data/drinks/cafe.json',
  zumos: 'src/app/data/drinks/zumos.json',
  cervezas: 'src/app/data/drinks/cervezas.json',
  vodka: 'src/app/data/drinks/vodka.json',
  aperitivos: 'src/app/data/drinks/aperitivos.json',
  rones: 'src/app/data/drinks/rones.json',
  brandy: 'src/app/data/drinks/brandy.json',
  ginebra: 'src/app/data/drinks/ginebra.json',
  whisky: 'src/app/data/drinks/whisky.json',
  chupitos: 'src/app/data/drinks/chupitos.json',
};

@Component({
  selector: 'app-menu-editor-local-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './menu-editor-local-page.component.html',
  styleUrls: ['./menu-editor-local-page.component.scss'],
})
export class MenuEditorLocalPageComponent implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private routeSub?: Subscription;

  readonly tab = signal<EditorTab>('precios');
  readonly sections = signal<MenuSection[]>(cloneSections(MENU_SECTIONS));
  readonly catalogsReady = signal(false);
  cartaKind: CartaKind = 'comida';

  readonly allergenList = ALLERGEN_LIST;

  lastMessage: string | null = null;

  /** Borradores completos de los tres catálogos (misma forma que en `public/assets/i18n/`). */
  catalogEs: CatalogJson | null = null;
  catalogEn: CatalogJson | null = null;
  catalogDe: CatalogJson | null = null;

  priceSectionId = MENU_SECTIONS[0]?.id ?? 'entrantes';
  priceItemIndex = 0;

  editNameEs = '';
  editNameEn = '';
  editNameDe = '';
  editDescEs = '';
  editDescEn = '';
  editDescDe = '';
  editNoteEs = '';
  editNoteEn = '';
  editNoteDe = '';
  editHighlight = false;
  editAllergens: AllergenCode[] = [];
  editPriceSingle = '';
  editTapa = '';
  editMedia = '';
  editRacion = '';

  addSectionId = 'entrantes';
  addNameEs = '';
  addNameEn = '';
  addNameDe = '';
  addDescEs = '';
  addDescEn = '';
  addDescDe = '';
  addNoteEs = '';
  addNoteEn = '';
  addNoteDe = '';
  addUseTriple = true;
  addTapa = '0,00€';
  addMedia = '0,00€';
  addRacion = '0,00€';
  addSingle = '0,00€';
  addHighlight = false;
  addAllergens: AllergenCode[] = [];

  newId = '';
  newIcon = '🍽️';
  newTitle = '';
  newSubtitle = '';
  newHasTriple = false;

  setTab(t: EditorTab): void {
    this.tab.set(t);
  }

  /** Un solo botón: según la pestaña activa, aplica editar plato, añadir plato o nueva categoría. */
  saveChanges(): void {
    switch (this.tab()) {
      case 'precios':
        this.applyPriceToMemory();
        break;
      case 'plato':
        this.addDishToMemory();
        break;
      case 'categoria':
        this.addCategoryToMemory();
        break;
    }
  }

  saveChangesDisabled(): boolean {
    if (this.tab() === 'categoria') return false;
    if (this.isDrinks()) return false;
    return !this.catalogsReady();
  }

  isDrinks(): boolean {
    return this.cartaKind === 'bebidas';
  }

  editorTitle(): string {
    return this.isDrinks() ? 'Editor de carta de bebidas' : 'Editor de carta de comida';
  }

  getFileHint(sectionId: string): string {
    const map = this.isDrinks() ? DRINKS_FILE_HINT : FOOD_FILE_HINT;
    return map[sectionId] ?? '…';
  }

  printLinkQuery(): { carta?: string } {
    return this.isDrinks() ? { carta: 'bebidas' } : {};
  }

  setCartaKind(kind: CartaKind): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: kind === 'comida' ? { carta: null } : { carta: kind },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      const kind: CartaKind = params.get('carta') === 'bebidas' ? 'bebidas' : 'comida';
      this.applyCartaKind(kind);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private applyCartaKind(kind: CartaKind): void {
    this.cartaKind = kind;
    const src = kind === 'bebidas' ? DRINKS_SECTIONS : MENU_SECTIONS;
    this.sections.set(cloneSections(src));
    this.priceSectionId = src[0]?.id ?? (kind === 'bebidas' ? 'refrescos' : 'entrantes');
    this.addSectionId = this.priceSectionId;
    this.priceItemIndex = 0;

    if (kind === 'bebidas') {
      this.catalogsReady.set(true);
      this.loadPriceFormFromSelection({ silent: true });
      return;
    }

    void this.ensureFoodCatalogsLoaded();
  }

  private async ensureFoodCatalogsLoaded(): Promise<void> {
    if (this.catalogEs && this.catalogEn && this.catalogDe) {
      this.catalogsReady.set(true);
      this.loadPriceFormFromSelection({ silent: true });
      return;
    }
    try {
      const [es, en, de] = await Promise.all([
        firstValueFrom(this.http.get<CatalogJson>('/assets/i18n/catalog.es.json')),
        firstValueFrom(this.http.get<CatalogJson>('/assets/i18n/catalog.en.json')),
        firstValueFrom(this.http.get<CatalogJson>('/assets/i18n/catalog.de.json')),
      ]);
      this.catalogEs = cloneJson(es);
      this.catalogEn = cloneJson(en);
      this.catalogDe = cloneJson(de);
      this.catalogsReady.set(true);
      this.loadPriceFormFromSelection({ silent: true });
    } catch {
      this.flash('No se pudieron cargar catalog.es/en/de.json desde /assets/.');
    }
  }

  onPriceSectionChange(): void {
    this.priceItemIndex = 0;
    this.loadPriceFormFromSelection({});
  }

  onPriceDishSelectChange(): void {
    this.loadPriceFormFromSelection({});
  }

  getPriceSection(): MenuSection | undefined {
    return this.sections().find(s => s.id === this.priceSectionId);
  }

  getPriceItem(): MenuItem | undefined {
    const s = this.getPriceSection();
    if (!s?.items?.length) return undefined;
    const idx = Math.min(Math.max(0, this.priceItemIndex), s.items.length - 1);
    return s.items[idx];
  }

  maxItemIndex(): number {
    const n = this.getPriceSection()?.items?.length ?? 0;
    return Math.max(0, n - 1);
  }

  loadPriceFormFromSelection(opts: { silent?: boolean } = {}): void {
    const silent = !!opts.silent;
    const it = this.getPriceItem();
    const sid = this.priceSectionId;
    const idx = Math.min(this.priceItemIndex, this.maxItemIndex());
    if (!it) {
      this.editNameEs = '';
      this.editNameEn = '';
      this.editNameDe = '';
      this.editDescEs = '';
      this.editDescEn = '';
      this.editDescDe = '';
      this.editNoteEs = '';
      this.editNoteEn = '';
      this.editNoteDe = '';
      this.editHighlight = false;
      this.editAllergens = [];
      this.editPriceSingle = '';
      this.editTapa = '';
      this.editMedia = '';
      this.editRacion = '';
      if (!silent && this.getPriceSection()?.items?.length === 0) {
        this.flash(this.isDrinks() ? 'Esta categoría no tiene bebidas.' : 'Esta categoría no tiene platos.');
      }
      return;
    }

    const eEs = readItemEntry(this.catalogEs, sid, idx);
    const eEn = readItemEntry(this.catalogEn, sid, idx);
    const eDe = readItemEntry(this.catalogDe, sid, idx);

    this.editNameEs = (eEs?.['name'] ?? it.name ?? '').trim();
    this.editNameEn = (eEn?.['name'] ?? '').trim();
    this.editNameDe = (eDe?.['name'] ?? '').trim();
    this.editDescEs = (eEs?.['description'] ?? it.description ?? '').trim();
    this.editDescEn = (eEn?.['description'] ?? '').trim();
    this.editDescDe = (eDe?.['description'] ?? '').trim();
    this.editNoteEs = (eEs?.['note'] ?? it.note ?? '').trim();
    this.editNoteEn = (eEn?.['note'] ?? '').trim();
    this.editNoteDe = (eDe?.['note'] ?? '').trim();

    this.editHighlight = !!it.highlight;
    this.editAllergens = [...(it.allergens ?? [])];
    if (it.triplePrice) {
      this.editTapa = it.triplePrice.tapa;
      this.editMedia = it.triplePrice.media;
      this.editRacion = it.triplePrice.racion;
      this.editPriceSingle = '';
    } else {
      this.editPriceSingle = it.price ?? '';
      this.editTapa = '';
      this.editMedia = '';
      this.editRacion = '';
    }
    if (!silent) {
      this.flash(
        this.isDrinks()
          ? 'Datos de la bebida cargados.'
          : 'Datos del plato cargados (ES / EN / DE).',
      );
    }
  }

  applyPriceToMemory(): void {
    if (!this.isDrinks() && (!this.catalogEs || !this.catalogEn || !this.catalogDe)) {
      this.flash('Espera a que carguen los catálogos de idioma.');
      return;
    }
    const nameEs = this.editNameEs.trim();
    if (!nameEs) {
      this.flash('El nombre en español es obligatorio.');
      return;
    }
    const sid = this.priceSectionId;
    const idx = Math.min(this.priceItemIndex, this.maxItemIndex());
    const descEs = this.editDescEs.trim();
    const descEn = this.editDescEn.trim();
    const descDe = this.editDescDe.trim();
    const nameEn = this.editNameEn.trim();
    const nameDe = this.editNameDe.trim();
    const noteEs = this.editNoteEs.trim();
    const noteEn = this.editNoteEn.trim();
    const noteDe = this.editNoteDe.trim();

    if (!this.isDrinks()) {
      this.patchCatalogTriplet(sid, idx, {
        es: { name: nameEs, description: descEs, note: noteEs },
        en: { name: nameEn, description: descEn, note: noteEn },
        de: { name: nameDe, description: descDe, note: noteDe },
      });
    }

    this.sections.update(list => {
      const next = cloneSections(list);
      const sec = next.find(s => s.id === sid);
      if (!sec?.items?.[idx]) return list;
      const it = sec.items[idx];
      it.name = nameEs;

      if (this.isDrinks()) {
        delete it.description;
        delete it.note;
        delete it.highlight;
        delete it.allergens;
        delete it.triplePrice;
        it.price = this.editPriceSingle.trim() || it.price;
        return next;
      }

      if (descEs) it.description = descEs;
      else delete it.description;
      if (noteEs) it.note = noteEs;
      else delete it.note;
      it.highlight = this.editHighlight || undefined;
      if (this.editAllergens.length) it.allergens = [...this.editAllergens];
      else delete it.allergens;

      if (it.triplePrice) {
        it.triplePrice = {
          tapa: this.editTapa.trim() || '—',
          media: this.editMedia.trim() || '—',
          racion: this.editRacion.trim() || '—',
        };
        delete it.price;
      } else {
        it.price = this.editPriceSingle.trim() || it.price;
      }
      return next;
    });
    this.flash(
      this.isDrinks()
        ? 'Cambios guardados. Al terminar, descarga drinks.zip y sustituye src/app/data/drinks/.'
        : 'Cambios guardados. Siguen acumulándose hasta recargar la página (F5). Al terminar, descarga menu.zip y los catalog.*.json y cópialos al repo.',
    );
  }

  addDishToMemory(): void {
    if (!this.isDrinks() && (!this.catalogEs || !this.catalogEn || !this.catalogDe)) {
      this.flash('Espera a que carguen los catálogos de idioma.');
      return;
    }
    const nameEs = this.addNameEs.trim();
    if (!nameEs) {
      this.flash('Indica al menos el nombre en español.');
      return;
    }
    const descEs = this.addDescEs.trim();
    const descEn = this.addDescEn.trim();
    const descDe = this.addDescDe.trim();
    const nameEn = this.addNameEn.trim();
    const nameDe = this.addNameDe.trim();
    const noteEs = this.addNoteEs.trim();
    const noteEn = this.addNoteEn.trim();
    const noteDe = this.addNoteDe.trim();

    const item: MenuItem = { name: nameEs };
    const sid = this.addSectionId;

    if (this.isDrinks()) {
      item.price = this.addSingle.trim() || '0,00€';
    } else {
      if (descEs) item.description = descEs;
      if (noteEs) item.note = noteEs;
      if (this.addHighlight) item.highlight = true;
      if (this.addAllergens.length) item.allergens = [...this.addAllergens];

      const sec = this.sections().find(s => s.id === sid);
      const triple = !!sec?.hasTriplePricing && this.addUseTriple;
      if (triple) {
        item.triplePrice = {
          tapa: this.addTapa.trim() || '—',
          media: this.addMedia.trim() || '—',
          racion: this.addRacion.trim() || '—',
        };
      } else {
        item.price = this.addSingle.trim() || '—';
      }
    }

    let newIndex = 0;
    this.sections.update(list => {
      const next = cloneSections(list);
      const s = next.find(x => x.id === sid);
      if (!s) return list;
      if (!s.items) s.items = [];
      s.items.push(item);
      newIndex = s.items.length - 1;
      return next;
    });

    if (!this.isDrinks()) {
      this.patchCatalogTriplet(sid, newIndex, {
        es: { name: nameEs, description: descEs, note: noteEs },
        en: { name: nameEn, description: descEn, note: noteEn },
        de: { name: nameDe, description: descDe, note: noteDe },
      });
    }

    this.flash(
      this.isDrinks()
        ? 'Bebida añadida. Al terminar descarga drinks.zip.'
        : 'Plato añadido. Puedes seguir editando; al terminar descarga menu.zip y los catalog.*.json que necesites.',
    );
    this.addNameEs = '';
    this.addNameEn = '';
    this.addNameDe = '';
    this.addDescEs = '';
    this.addDescEn = '';
    this.addDescDe = '';
    this.addNoteEs = '';
    this.addNoteEn = '';
    this.addNoteDe = '';
  }

  addCategoryToMemory(): void {
    const id = this.newId.trim().toLowerCase();
    if (!/^[a-z][a-z0-9-]*$/.test(id)) {
      this.flash('ID inválido: minúsculas, números y guiones (ej. tapas-frias).');
      return;
    }
    if (this.sections().some(s => s.id === id)) {
      this.flash('Ya existe una categoría con ese ID.');
      return;
    }
    const title = this.newTitle.trim();
    if (!title) {
      this.flash('Indica un título para la categoría.');
      return;
    }
    const section: MenuSection = {
      id,
      icon: this.newIcon.trim() || (this.isDrinks() ? '🍹' : '🍽️'),
      title,
      items: [],
      hasTriplePricing: this.isDrinks() ? false : this.newHasTriple,
    };
    const sub = this.newSubtitle.trim();
    if (sub) section.subtitle = sub;

    this.sections.update(list => [...cloneSections(list), section]);
    this.flash(
      this.isDrinks()
        ? `Categoría «${id}» creada. Añádela en drinks.data.ts. El archivo ${id}.json va dentro de drinks.zip al descargar.`
        : `Categoría «${id}» creada. Importa el JSON en menu.data.ts y añade entradas en catalog.*. El archivo ${id}.json va dentro de menu.zip al descargar.`,
    );
    this.newId = '';
    this.newTitle = '';
    this.newSubtitle = '';
  }

  async downloadMenuFolderZip(): Promise<void> {
    const drinks = this.isDrinks();
    const folderName = drinks ? 'drinks' : 'menu';
    const zipName = drinks ? 'drinks.zip' : 'menu.zip';
    const targetPath = drinks ? 'src/app/data/drinks/' : 'src/app/data/menu/';

    try {
      const zip = new JSZip();
      const folder = zip.folder(folderName);
      if (!folder) {
        this.flash('No se pudo crear el ZIP.');
        return;
      }
      for (const sec of this.sections()) {
        folder.file(`${sec.id}.json`, `${JSON.stringify(sec, null, 2)}\n`);
      }
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = zipName;
      a.click();
      URL.revokeObjectURL(a.href);
      this.flash(
        `Descargado: ${zipName} — dentro está la carpeta «${folderName}». Sustituye ${targetPath} por su contenido.`,
      );
    } catch {
      this.flash('Error al generar el ZIP.');
    }
  }

  downloadCatalogJson(lang: 'es' | 'en' | 'de'): void {
    const root =
      lang === 'es' ? this.catalogEs : lang === 'en' ? this.catalogEn : this.catalogDe;
    if (!root) {
      this.flash('Catálogo no disponible.');
      return;
    }
    const filename = `catalog.${lang}.json`;
    const blob = new Blob([JSON.stringify(root, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    this.flash(`Descargado: ${filename} — cópialo sobre public/assets/i18n/${filename}`);
  }

  toggleAllergen(list: 'edit' | 'add', code: AllergenCode): void {
    if (list === 'edit') {
      const arr = this.editAllergens;
      this.editAllergens = arr.includes(code)
        ? arr.filter(c => c !== code)
        : [...arr, code];
    } else {
      const arr = this.addAllergens;
      this.addAllergens = arr.includes(code)
        ? arr.filter(c => c !== code)
        : [...arr, code];
    }
  }

  allergenChecked(list: 'edit' | 'add', code: AllergenCode): boolean {
    return list === 'edit'
      ? this.editAllergens.includes(code)
      : this.addAllergens.includes(code);
  }

  getSectionById(id: string): MenuSection | undefined {
    return this.sections().find(s => s.id === id);
  }

  private patchCatalogTriplet(
    sectionId: string,
    index: number,
    triple: {
      es: { name: string; description: string; note: string };
      en: { name: string; description: string; note: string };
      de: { name: string; description: string; note: string };
    },
  ): void {
    if (!this.catalogEs || !this.catalogEn || !this.catalogDe) return;
    const apply = (root: CatalogJson, p: { name: string; description: string; note: string }) => {
      const entry = ensureItemEntry(root, sectionId, index);
      setOrDelete(entry, 'name', p.name);
      setOrDelete(entry, 'description', p.description);
      setOrDelete(entry, 'note', p.note);
    };
    apply(this.catalogEs, triple.es);
    apply(this.catalogEn, triple.en);
    apply(this.catalogDe, triple.de);
  }

  private flash(msg: string): void {
    this.lastMessage = msg;
    window.setTimeout(() => {
      this.lastMessage = null;
    }, 5000);
  }
}
