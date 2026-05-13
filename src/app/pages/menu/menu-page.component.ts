import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_SECTIONS } from '../../data/menu.data';
import { MenuItem, MenuSection } from '../../models/menu.model';
import { AllergenIconComponent } from '../../components/allergen-icon/allergen-icon.component';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { I18nService } from '../../i18n/i18n.service';

const LEGEND_CODES = [
  'gluten',
  'crustaceos',
  'huevo',
  'pescado',
  'cacahuetes',
  'soja',
  'lacteos',
  'frutosSecos',
  'apio',
  'mostaza',
  'sesamo',
  'sulfitos',
  'altramuces',
  'moluscos',
] as const;

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, AllergenIconComponent, TranslatePipe],
  template: `
    <div class="wrap">
      <div class="top">
        <div class="top-copy">
          <h2>{{ 'menu.title' | t }}</h2>
          <p class="lead">{{ 'menu.lead' | t }}</p>
        </div>
        <div class="top-logo">
          <img
            src="/assets/brand/logo-las-salinas.png"
            [attr.alt]="'menu.logoAlt' | t"
            width="320"
            height="200"
            loading="lazy"
          />
        </div>
      </div>

      <div class="controls">
        <input
          class="search"
          type="search"
          [attr.placeholder]="'menu.searchPlaceholder' | t"
          [value]="query()"
          (input)="query.set(($any($event.target).value || '').trim())"
        />

        <div class="chips">
          <button
            type="button"
            class="chip"
            [class.active]="activeSectionId() === 'todas'"
            (click)="activeSectionId.set('todas')"
          >{{ 'menu.filterAll' | t }}</button>
          <button
            type="button"
            class="chip"
            *ngFor="let s of sections"
            [class.active]="activeSectionId() === s.id"
            (click)="activeSectionId.set(s.id)"
          >{{ secTitle(s) }}</button>
        </div>
      </div>

      <div class="sections">
        <section class="section" *ngFor="let s of filteredSections()">
          <div class="section-head" [class.section-head-triple]="s.hasTriplePricing">
            <div class="left">
              <span class="emoji">{{ s.icon }}</span>
              <span class="title">{{ secTitle(s) }}</span>
            </div>
            <div class="pricing" *ngIf="s.hasTriplePricing">
              <span>{{ 'menu.pricing.tapa' | t }}</span>
              <span>{{ 'menu.pricing.half' | t }}</span>
              <span>{{ 'menu.pricing.racion' | t }}</span>
            </div>
          </div>

          <div class="items">
            <article class="item" *ngFor="let it of s.items; let i = index" [class.highlight]="it.highlight">
              <div class="row" [class.row-triple]="s.hasTriplePricing">
                <div class="name">
                  {{ itemName(s, i, it.name) }}
                  <span class="allergens" *ngIf="it.allergens?.length">
                    <app-allergen-icon *ngFor="let code of it.allergens" [code]="code"></app-allergen-icon>
                  </span>
                </div>

                <div class="prices" *ngIf="s.hasTriplePricing && it.triplePrice">
                  <span>{{ it.triplePrice.tapa }}</span>
                  <span>{{ it.triplePrice.media }}</span>
                  <span>{{ it.triplePrice.racion }}</span>
                </div>

                <div class="price" *ngIf="!s.hasTriplePricing && it.price">
                  {{ it.price }}
                </div>
              </div>

              <div class="desc" *ngIf="it.description">{{ itemDesc(s, i, it.description) }}</div>
              <div class="note" *ngIf="it.note">{{ itemNote(s, i, it.note) }}</div>
            </article>
          </div>
        </section>
      </div>

      <details class="legend">
        <summary>⚠ {{ 'menu.legendSummary' | t }}</summary>
        <div class="legend-grid">
          <div class="legend-item" *ngFor="let code of legendCodes">
            <app-allergen-icon [code]="code"></app-allergen-icon>
            <span>{{ ('menu.legend.' + code) | t }}</span>
          </div>
        </div>
      </details>
    </div>
  `,
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  private readonly i18n = inject(I18nService);

  readonly sections: MenuSection[] = MENU_SECTIONS;
  readonly legendCodes = LEGEND_CODES;

  readonly query = signal('');
  readonly activeSectionId = signal<'todas' | string>('todas');

  secTitle(s: MenuSection): string {
    return this.i18n.catalog(`catalog.sections.${s.id}`, s.title);
  }

  itemName(s: MenuSection, i: number, fallback: string): string {
    return this.i18n.catalog(`catalog.items.${s.id}.${i}.name`, fallback);
  }

  itemDesc(s: MenuSection, i: number, fallback: string | undefined): string {
    if (!fallback) return '';
    return this.i18n.catalog(`catalog.items.${s.id}.${i}.description`, fallback);
  }

  itemNote(s: MenuSection, i: number, fallback: string | undefined): string {
    if (!fallback) return '';
    return this.i18n.catalog(`catalog.items.${s.id}.${i}.note`, fallback);
  }

  readonly filteredSections = computed(() => {
    this.i18n.lang();
    const q = this.query().toLowerCase();
    const active = this.activeSectionId();

    const bySection =
      active === 'todas' ? this.sections : this.sections.filter(s => s.id === active);

    if (!q) return bySection;

    return bySection
      .map(s => ({
        ...s,
        items: s.items.filter((it, idx) => this.itemMatchesSearch(s, it, idx, q)),
      }))
      .filter(s => s.items.length > 0);
  });

  private itemMatchesSearch(s: MenuSection, it: MenuItem, index: number, q: string): boolean {
    const inEs =
      (it.name || '').toLowerCase().includes(q) ||
      (it.description || '').toLowerCase().includes(q) ||
      (it.note || '').toLowerCase().includes(q);
    if (inEs) return true;
    const dn = this.itemName(s, index, it.name).toLowerCase();
    const dd = it.description ? this.itemDesc(s, index, it.description).toLowerCase() : '';
    const dn2 = it.note ? this.itemNote(s, index, it.note).toLowerCase() : '';
    return dn.includes(q) || dd.includes(q) || dn2.includes(q);
  }
}
