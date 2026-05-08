import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MENU_SECTIONS } from '../../data/menu.data';
import { MenuSection } from '../../models/menu.model';
import { AllergenIconComponent } from '../../components/allergen-icon/allergen-icon.component';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [CommonModule, AllergenIconComponent],
  template: `
    <div class="wrap">
      <div class="top">
        <div class="top-copy">
          <h2>Carta</h2>
          <p class="lead">Platos, precios y alérgenos.</p>
        </div>
        <div class="top-logo">
          <img
            src="/assets/brand/logo-las-salinas.png"
            alt="Las Salinas"
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
          placeholder="Buscar en la carta…"
          [value]="query()"
          (input)="query.set(($any($event.target).value || '').trim())"
        />

        <div class="chips">
          <button
            type="button"
            class="chip"
            [class.active]="activeSectionId() === 'todas'"
            (click)="activeSectionId.set('todas')"
          >Todas</button>
          <button
            type="button"
            class="chip"
            *ngFor="let s of sections"
            [class.active]="activeSectionId() === s.id"
            (click)="activeSectionId.set(s.id)"
          >{{ s.title }}</button>
        </div>
      </div>

      <div class="sections">
        <section class="section" *ngFor="let s of filteredSections()">
          <div class="section-head" [class.section-head-triple]="s.hasTriplePricing">
            <div class="left">
              <span class="emoji">{{ s.icon }}</span>
              <span class="title">{{ s.title }}</span>
            </div>
            <div class="pricing" *ngIf="s.hasTriplePricing">
              <span>Tapa</span><span>½</span><span>Ración</span>
            </div>
          </div>

          <div class="pills" *ngIf="s.pillItems?.length">
            <span class="pill" *ngFor="let p of s.pillItems">{{ p }}</span>
          </div>

          <div class="items">
            <article class="item" *ngFor="let it of s.items" [class.highlight]="it.highlight">
              <div class="row" [class.row-triple]="s.hasTriplePricing">
                <div class="name">
                  {{ it.name }}
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

              <div class="desc" *ngIf="it.description">{{ it.description }}</div>
              <div class="note" *ngIf="it.note">{{ it.note }}</div>
            </article>
          </div>
        </section>
      </div>

      <details class="legend">
        <summary>⚠ Leyenda de alérgenos</summary>
        <div class="legend-grid">
          <div class="legend-item" *ngFor="let a of legend">
            <app-allergen-icon [code]="a.code"></app-allergen-icon>
            <span>{{ a.label }}</span>
          </div>
        </div>
      </details>
    </div>
  `,
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  readonly sections: MenuSection[] = MENU_SECTIONS;

  readonly query = signal('');
  readonly activeSectionId = signal<'todas' | string>('todas');

  readonly filteredSections = computed(() => {
    const q = this.query().toLowerCase();
    const active = this.activeSectionId();

    const bySection =
      active === 'todas' ? this.sections : this.sections.filter(s => s.id === active);

    if (!q) return bySection;

    return bySection
      .map(s => ({
        ...s,
        items: s.items.filter(it => {
          const hay =
            (it.name || '').toLowerCase().includes(q) ||
            (it.description || '').toLowerCase().includes(q);
          return hay;
        }),
      }))
      .filter(s => s.items.length > 0 || (s.pillItems?.length ?? 0) > 0);
  });

  readonly legend = [
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
  ] as const;
}

