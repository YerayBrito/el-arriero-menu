import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MenuSectionComponent } from '../section/menu-section.component';
import { AllergenIconComponent } from '../allergen-icon/allergen-icon.component';
import { MENU_SECTIONS } from '../../data/menu.data';
import { CARTA_SHEET_IDS, CartaKind, DRINKS_SECTIONS } from '../../data/drinks.data';
import { AllergenCode, MenuSection } from '../../models/menu.model';
import {
  MenuPrintCatalogService,
  PrintLang,
} from '../../i18n/menu-print-catalog.service';

interface LegendItem {
  code: AllergenCode;
  label: string;
}

const LEGEND_ES: LegendItem[] = [
  { code: 'gluten', label: 'Cereales que contengan gluten' },
  { code: 'crustaceos', label: 'Crustáceos' },
  { code: 'huevo', label: 'Huevos' },
  { code: 'pescado', label: 'Pescado' },
  { code: 'cacahuetes', label: 'Cacahuetes' },
  { code: 'soja', label: 'Soja' },
  { code: 'lacteos', label: 'Leche' },
  { code: 'frutosSecos', label: 'Frutos de cáscara' },
  { code: 'apio', label: 'Apio' },
  { code: 'mostaza', label: 'Mostaza' },
  { code: 'sesamo', label: 'Granos de sésamo' },
  { code: 'sulfitos', label: 'Dióxido de azufre y sulfitos' },
  { code: 'altramuces', label: 'Altramuces' },
  { code: 'moluscos', label: 'Moluscos' },
];

const LEGEND_EN: LegendItem[] = [
  { code: 'gluten', label: 'Cereals containing gluten' },
  { code: 'crustaceos', label: 'Crustaceans' },
  { code: 'huevo', label: 'Eggs' },
  { code: 'pescado', label: 'Fish' },
  { code: 'cacahuetes', label: 'Peanuts' },
  { code: 'soja', label: 'Soybeans' },
  { code: 'lacteos', label: 'Milk' },
  { code: 'frutosSecos', label: 'Tree nuts' },
  { code: 'apio', label: 'Celery' },
  { code: 'mostaza', label: 'Mustard' },
  { code: 'sesamo', label: 'Sesame seeds' },
  { code: 'sulfitos', label: 'Sulphur dioxide and sulphites' },
  { code: 'altramuces', label: 'Lupin' },
  { code: 'moluscos', label: 'Molluscs' },
];

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuSectionComponent, AllergenIconComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly printCatalog = inject(MenuPrintCatalogService);

  readonly restaurantName = 'LAS SALINAS';
  readonly addressLine = 'C. Churruca, 40 · 35118 Arinaga · Las Palmas';
  readonly mapsUrl = 'https://maps.app.goo.gl/Jss47pXqB7tWmpqn7';

  readonly cartaKind = toSignal(
    this.route.queryParamMap.pipe(
      map(params => (params.get('carta') === 'bebidas' ? 'bebidas' : 'comida') as CartaKind)
    ),
    { initialValue: 'comida' as CartaKind }
  );

  readonly printLang = toSignal(
    this.route.queryParamMap.pipe(
      map(params => (params.get('lang') === 'en' ? 'en' : 'es') as PrintLang)
    ),
    { initialValue: 'es' as PrintLang }
  );

  readonly isDrinks = computed(() => this.cartaKind() === 'bebidas');
  readonly isEnglish = computed(() => this.printLang() === 'en');

  readonly tagline = computed(() => {
    if (this.isDrinks()) {
      return this.isEnglish() ? 'Drinks Menu' : 'Carta de Bebidas';
    }
    return this.isEnglish() ? 'From the sea to your table' : 'Sabor que navega contigo';
  });

  readonly toolbarTitle = computed(() => {
    const kind = this.isDrinks() ? 'Bebidas' : 'Comida';
    const lang = this.isEnglish() ? 'EN' : 'ES';
    return this.isPrintView()
      ? `Las Salinas — Carta de ${kind} (${lang}) · Imprimir`
      : 'Las Salinas — Editor de Carta';
  });

  readonly legendTitle = computed(() =>
    this.isEnglish()
      ? '⚠ Allergens — EU Regulation 1169/2011'
      : '⚠ Alérgenos — Reglamento UE 1169/2011'
  );

  readonly legend = computed(() => (this.isEnglish() ? LEGEND_EN : LEGEND_ES));

  readonly footerNote = computed(() => {
    if (this.isDrinks()) {
      return this.isEnglish()
        ? 'Prices include VAT (IGIC) · Per unit · Please ask our staff'
        : 'Precios con IGIC incluido · Precio por unidad · Consulte al personal';
    }
    return this.isEnglish()
      ? 'Prices include VAT (IGIC) · Fresh seasonal produce · See drinks menu for beverages'
      : 'Precios con IGIC incluido · Producto fresco de temporada · Consulte la carta de bebidas con el personal';
  });

  readonly footerWarn = computed(() =>
    this.isEnglish()
      ? `⚠ Please inform our staff of any allergy or intolerance · ${this.addressLine}`
      : `⚠ Informe al personal si padece alguna alergia o intolerancia · ${this.addressLine}`
  );

  readonly pricingLabels = computed(() =>
    this.isEnglish()
      ? { tapa: 'Small', half: '½', racion: 'Full portion' }
      : null
  );

  readonly leftSections = computed(() => {
    this.printCatalog.ready();
    this.printLang();
    this.cartaKind();
    return this.localizeColumn('left');
  });

  readonly rightSections = computed(() => {
    this.printCatalog.ready();
    this.printLang();
    this.cartaKind();
    return this.localizeColumn('right');
  });

  ngOnInit(): void {
    if (this.isPrintView()) {
      void this.printCatalog.load();
    }
  }

  isPrintView(): boolean {
    const url = this.router.url.split('?')[0].split('#')[0];
    return url === '/carta/imprimir' || url.endsWith('/carta/imprimir');
  }

  setCartaKind(kind: CartaKind): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: kind === 'comida' ? { carta: null } : { carta: kind },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  setPrintLang(lang: PrintLang): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: lang === 'es' ? { lang: null } : { lang },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  editorLinkQuery(): { carta?: string; lang?: string } {
    const q: { carta?: string; lang?: string } = {};
    if (this.isDrinks()) q.carta = 'bebidas';
    if (this.isEnglish()) q.lang = 'en';
    return q;
  }

  printMenu(): void {
    window.print();
  }

  private localizeColumn(side: 'left' | 'right'): MenuSection[] {
    const sections = this.sectionsForColumn(side);
    const lang = this.printLang();
    const kind = this.cartaKind();
    if (!this.printCatalog.ready()) return sections;
    return sections.map(section => this.printCatalog.localizeSection(kind, lang, section));
  }

  private sectionsForColumn(side: 'left' | 'right'): MenuSection[] {
    const kind = this.cartaKind();
    const ids = CARTA_SHEET_IDS[kind][side];
    const pool = kind === 'bebidas' ? DRINKS_SECTIONS : MENU_SECTIONS;
    return ids
      .map(id => pool.find(section => section.id === id))
      .filter((section): section is MenuSection => section != null);
  }
}
