import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type AppLang = 'es' | 'en' | 'de';

const LANG_STORAGE = 'lassalinas_lang';
const SUPPORTED: readonly AppLang[] = ['es', 'en', 'de'];

function flattenObject(obj: unknown, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (typeof v === 'string') {
        out[key] = v;
      } else if (v && typeof v === 'object' && !Array.isArray(v)) {
        Object.assign(out, flattenObject(v, key));
      }
    }
  }
  return out;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);

  /** Catálogo aplanado listo para `t("clave.anidada")` */
  private readonly flat = signal<Record<string, string>>({});

  readonly lang = signal<AppLang>('es');

  async loadInitialLanguage(): Promise<void> {
    let chosen: AppLang = 'es';
    try {
      const stored = localStorage.getItem(LANG_STORAGE) as AppLang | null;
      if (stored && SUPPORTED.includes(stored)) {
        chosen = stored;
      }
    } catch {
      /* localStorage no disponible */
    }
    await this.useLanguage(chosen);
  }

  async useLanguage(lang: AppLang): Promise<void> {
    const data = await firstValueFrom(
      this.http.get<Record<string, unknown>>(`/assets/i18n/${lang}.json`),
    );
    try {
      const catalogOnly = await firstValueFrom(
        this.http.get<Record<string, unknown>>(`/assets/i18n/catalog.${lang}.json`),
      );
      (data as Record<string, unknown>)['catalog'] = catalogOnly;
    } catch {
      /* Sin catalog.{lang}.json: `catalog()` usará el texto del JSON de menú */
    }
    try {
      const drinksCatalog = await firstValueFrom(
        this.http.get<Record<string, unknown>>(`/assets/i18n/catalog.drinks.${lang}.json`),
      );
      (data as Record<string, unknown>)['catalogDrinks'] = drinksCatalog;
    } catch {
      if (lang !== 'es') {
        try {
          const drinksEs = await firstValueFrom(
            this.http.get<Record<string, unknown>>('/assets/i18n/catalog.drinks.es.json'),
          );
          (data as Record<string, unknown>)['catalogDrinks'] = drinksEs;
        } catch {
          /* bebidas: nombres del JSON */
        }
      }
    }
    this.flat.set(flattenObject(data));
    this.lang.set(lang);
    try {
      localStorage.setItem(LANG_STORAGE, lang);
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  t(key: string): string {
    return this.flat()[key] ?? key;
  }

  /**
   * Textos de la carta: claves `catalog.*` desde `catalog.es.json` / `catalog.en.json` / `catalog.de.json`.
   * Si falta una clave en el JSON, se usa el texto del menú en `src/app/data/menu/*.json`.
   */
  catalog(key: string, fallback: string): string {
    this.lang();
    const v = this.flat()[key];
    if (v !== undefined && v !== '' && v !== key) {
      return v;
    }
    return fallback;
  }
}
