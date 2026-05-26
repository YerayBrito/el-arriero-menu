import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { MENU_SECTIONS } from '../../data/menu.data';
import { CartaKind, DRINKS_SECTIONS } from '../../data/drinks.data';
import { MenuSection } from '../../models/menu.model';
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
    <div class="page-shell menu-page">
      <header class="page-hero">
        <div class="page-hero-copy">
          <h1 class="page-title">{{ 'menu.title' | t }}</h1>
          <p class="page-lead">
            @if (isDrinks()) {
              {{ 'menu.leadDrinks' | t }}
            } @else {
              {{ 'menu.lead' | t }}
            }
          </p>
        </div>
        <div class="page-hero-logo">
          <img
            src="/assets/brand/logo-las-salinas.png"
            [attr.alt]="'menu.logoAlt' | t"
            width="320"
            height="200"
            loading="lazy"
          />
        </div>
      </header>

      <div class="menu-carta-toolbar">
        <div class="menu-carta-switch" role="tablist" [attr.aria-label]="'menu.cartaSwitchLabel' | t">
          <button
            type="button"
            class="menu-carta-switch-btn"
            role="tab"
            [attr.aria-selected]="!isDrinks()"
            [class.active]="!isDrinks()"
            (click)="setCartaKind('comida')"
          >{{ 'menu.cartaComida' | t }}</button>
          <button
            type="button"
            class="menu-carta-switch-btn"
            role="tab"
            [attr.aria-selected]="isDrinks()"
            [class.active]="isDrinks()"
            (click)="setCartaKind('bebidas')"
          >{{ 'menu.cartaBebidas' | t }}</button>
        </div>

        @if (!isDrinks()) {
          <div class="menu-takeaway-badge">{{ 'menu.takeawayNote' | t }}</div>
        }
      </div>

      <div class="menu-layout surface-panel">
        <nav class="menu-nav" [attr.aria-label]="'menu.navLabel' | t" role="tablist">
          @for (s of sections(); track s.id) {
            <button
              type="button"
              class="nav-item"
              role="tab"
              [attr.aria-selected]="activeSectionId() === s.id"
              [class.active]="activeSectionId() === s.id"
              (click)="selectSection(s.id)"
            >
              <span class="nav-emoji" aria-hidden="true">{{ s.icon }}</span>
              <span class="nav-label">{{ secTitle(s) }}</span>
            </button>
          }
        </nav>

        @if (activeSection(); as s) {
          <div
            class="menu-content"
            role="tabpanel"
            [attr.aria-labelledby]="'nav-' + s.id"
          >
            <section
              class="section"
              [id]="'menu-' + s.id"
              [class.section-dual-pricing]="s.halfRacionOnly"
            >
              <header class="section-head" [class.section-head-triple]="s.hasTriplePricing">
                <div class="section-title-block">
                  <span class="emoji" aria-hidden="true">{{ s.icon }}</span>
                  <h2 class="title" [id]="'nav-' + s.id">{{ secTitle(s) }}</h2>
                </div>
                @if (s.hasTriplePricing) {
                  <div class="pricing" role="row">
                    @if (!s.halfRacionOnly) {
                      <span>{{ 'menu.pricing.tapa' | t }}</span>
                    }
                    <span>{{ 'menu.pricing.half' | t }}</span>
                    <span>{{ 'menu.pricing.racion' | t }}</span>
                  </div>
                }
              </header>

              <div class="items">
                @for (it of s.items; track $index; let i = $index) {
                  <article class="menu-item" [class.highlight]="it.highlight">
                    @if (s.hasTriplePricing && it.triplePrice) {
                      <div class="menu-item-row menu-item-row--triple">
                        <div class="menu-item-name">
                          {{ itemName(s, i, it.name) }}
                          @if (it.allergens?.length) {
                            <span class="allergens">
                              @for (code of it.allergens; track code) {
                                <app-allergen-icon [code]="code"></app-allergen-icon>
                              }
                            </span>
                          }
                        </div>
                        <div class="prices">
                          @if (!s.halfRacionOnly && it.triplePrice.tapa) {
                            <span class="price-cell">{{ it.triplePrice.tapa }}</span>
                          }
                          <span class="price-cell">{{ it.triplePrice.media }}</span>
                          <span class="price-cell">{{ it.triplePrice.racion }}</span>
                        </div>
                      </div>
                    } @else if (s.hasTriplePricing && s.halfRacionOnly && it.price) {
                      <div class="menu-item-row menu-item-row--triple menu-item-row--dual-single">
                        <div class="menu-item-name">
                          {{ itemName(s, i, it.name) }}
                          @if (it.allergens?.length) {
                            <span class="allergens">
                              @for (code of it.allergens; track code) {
                                <app-allergen-icon [code]="code"></app-allergen-icon>
                              }
                            </span>
                          }
                        </div>
                        <div class="prices">
                          <span class="price-cell price-cell--dash">—</span>
                          <span class="price-cell">{{ it.price }}</span>
                        </div>
                      </div>
                    } @else {
                      <div class="menu-item-row">
                        <div class="menu-item-name">
                          {{ itemName(s, i, it.name) }}
                          @if (it.allergens?.length) {
                            <span class="allergens">
                              @for (code of it.allergens; track code) {
                                <app-allergen-icon [code]="code"></app-allergen-icon>
                              }
                            </span>
                          }
                        </div>
                        <span class="menu-item-leader" aria-hidden="true"></span>
                        @if (it.price) {
                          <span class="menu-item-price">{{ it.price }}</span>
                        }
                      </div>
                    }

                    @if (it.description) {
                      <p class="desc">{{ itemDesc(s, i, it.description) }}</p>
                    }
                    @if (it.note) {
                      <p class="note">{{ itemNote(s, i, it.note) }}</p>
                    }
                  </article>
                }
              </div>
            </section>
          </div>
        }
      </div>

      @if (!isDrinks()) {
        <details class="legend surface-panel">
          <summary>⚠ {{ 'menu.legendSummary' | t }}</summary>
          <div class="legend-grid">
            @for (code of legendCodes; track code) {
              <div class="legend-item">
                <app-allergen-icon [code]="code"></app-allergen-icon>
                <span>{{ ('menu.legend.' + code) | t }}</span>
              </div>
            }
          </div>
        </details>
      }
    </div>
  `,
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent {
  private readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly legendCodes = LEGEND_CODES;

  readonly cartaKind = toSignal(
    this.route.queryParamMap.pipe(
      map(params => (params.get('carta') === 'bebidas' ? 'bebidas' : 'comida') as CartaKind),
    ),
    { initialValue: 'comida' as CartaKind },
  );

  readonly isDrinks = computed(() => this.cartaKind() === 'bebidas');

  readonly sections = computed(() =>
    this.isDrinks() ? DRINKS_SECTIONS : MENU_SECTIONS,
  );

  readonly activeSectionId = signal<string>('entrantes');

  constructor() {
    effect(() => {
      const list = this.sections();
      const id = this.activeSectionId();
      if (!list.some(sec => sec.id === id)) {
        this.activeSectionId.set(list[0]?.id ?? 'entrantes');
      }
    });
  }

  readonly activeSection = computed(() => {
    this.i18n.lang();
    this.cartaKind();
    const list = this.sections();
    const id = this.activeSectionId();
    return list.find(sec => sec.id === id) ?? list[0];
  });

  private catalogRoot(): string {
    return this.isDrinks() ? 'catalogDrinks' : 'catalog';
  }

  secTitle(s: MenuSection): string {
    return this.i18n.catalog(`${this.catalogRoot()}.sections.${s.id}`, s.title);
  }

  itemName(s: MenuSection, i: number, fallback: string): string {
    return this.i18n.catalog(`${this.catalogRoot()}.items.${s.id}.${i}.name`, fallback);
  }

  itemDesc(s: MenuSection, i: number, fallback: string | undefined): string {
    if (!fallback) return '';
    return this.i18n.catalog(`${this.catalogRoot()}.items.${s.id}.${i}.description`, fallback);
  }

  itemNote(s: MenuSection, i: number, fallback: string | undefined): string {
    if (!fallback) return '';
    return this.i18n.catalog(`${this.catalogRoot()}.items.${s.id}.${i}.note`, fallback);
  }

  setCartaKind(kind: CartaKind): void {
    const list = kind === 'bebidas' ? DRINKS_SECTIONS : MENU_SECTIONS;
    this.activeSectionId.set(list[0]?.id ?? 'entrantes');
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: kind === 'bebidas' ? { carta: 'bebidas' } : { carta: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  selectSection(id: string): void {
    this.activeSectionId.set(id);
  }
}
