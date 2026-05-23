import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CartaKind } from '../data/drinks.data';
import { MenuItem, MenuSection } from '../models/menu.model';

export type PrintLang = 'es' | 'en';

interface CatalogRoot {
  sections?: Record<string, string>;
  pills?: Record<string, Record<string, string>>;
  items?: Record<string, Record<string, Record<string, string>>>;
}

@Injectable({ providedIn: 'root' })
export class MenuPrintCatalogService {
  private readonly http = inject(HttpClient);

  private foodEs: CatalogRoot | null = null;
  private foodEn: CatalogRoot | null = null;
  private drinksEs: CatalogRoot | null = null;
  private drinksEn: CatalogRoot | null = null;

  readonly ready = signal(false);

  async load(): Promise<void> {
    if (this.ready()) return;
    const [foodEs, foodEn, drinksEs, drinksEn] = await Promise.all([
      firstValueFrom(this.http.get<CatalogRoot>('/assets/i18n/catalog.es.json')),
      firstValueFrom(this.http.get<CatalogRoot>('/assets/i18n/catalog.en.json')),
      firstValueFrom(this.http.get<CatalogRoot>('/assets/i18n/catalog.drinks.es.json')),
      firstValueFrom(this.http.get<CatalogRoot>('/assets/i18n/catalog.drinks.en.json')),
    ]);
    this.foodEs = foodEs;
    this.foodEn = foodEn;
    this.drinksEs = drinksEs;
    this.drinksEn = drinksEn;
    this.ready.set(true);
  }

  localizeSection(kind: CartaKind, lang: PrintLang, section: MenuSection): MenuSection {
    if (lang === 'es' && kind === 'comida' && !section.pillItems?.length) {
      return section;
    }

    const cat = this.catalogFor(kind, lang);
    if (!cat) return section;

    const title = cat.sections?.[section.id] ?? section.title;

    const items = section.items.map((item, index) => this.localizeItem(cat, section.id, index, item));

    let pillItems = section.pillItems;
    if (pillItems?.length && cat.pills?.[section.id]) {
      const pillMap = cat.pills[section.id];
      pillItems = pillItems.map((pill, index) => pillMap[String(index)] ?? pill);
    }

    return { ...section, title, items, pillItems };
  }

  private localizeItem(
    cat: CatalogRoot,
    sectionId: string,
    index: number,
    item: MenuItem,
  ): MenuItem {
    const entry = cat.items?.[sectionId]?.[String(index)];
    if (!entry) return item;

    const next: MenuItem = {
      ...item,
      name: entry['name']?.trim() ? entry['name'] : item.name,
    };
    if (entry['description'] !== undefined) {
      if (entry['description'].trim()) next.description = entry['description'];
      else delete next.description;
    }
    if (entry['note'] !== undefined) {
      if (entry['note'].trim()) next.note = entry['note'];
      else delete next.note;
    }
    return next;
  }

  private catalogFor(kind: CartaKind, lang: PrintLang): CatalogRoot | null {
    if (kind === 'bebidas') {
      return lang === 'en' ? this.drinksEn : this.drinksEs;
    }
    return lang === 'en' ? this.foodEn : this.foodEs;
  }
}
