import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSection } from '../../models/menu.model';
import { AllergenIconComponent } from '../allergen-icon/allergen-icon.component';
import { SectionIconComponent } from '../section-icon/section-icon.component';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule, AllergenIconComponent, SectionIconComponent, TranslatePipe],
  template: `
    <div class="section">
      <div class="section-header">
        <app-section-icon class="section-icon" [icon]="section.icon || section.id" />
        <span class="section-title">{{ section.title }}</span>
        <span class="section-deco">✦</span>
      </div>

      <!-- Precios: tapa+½+ración o solo ½+ración (entrantes) -->
      <div class="price-header" *ngIf="section.hasTriplePricing" [class.price-header-dual]="section.halfRacionOnly">
        @if (pricingLabels) {
          @if (!section.halfRacionOnly) {
            <span class="ph-label">{{ pricingLabels.tapa }}</span>
          }
          <span class="ph-label">{{ pricingLabels.half }}</span>
          <span class="ph-label">{{ pricingLabels.racion }}</span>
        } @else {
          @if (!section.halfRacionOnly) {
            <span class="ph-label">{{ 'menu.pricing.tapa' | t }}</span>
          }
          <span class="ph-label">{{ 'menu.pricing.half' | t }}</span>
          <span class="ph-label">{{ 'menu.pricing.racion' | t }}</span>
        }
      </div>

      <!-- Pill items (salsas) -->
      <div class="pills-row" *ngIf="section.pillItems?.length">
        <span class="pill" *ngFor="let pill of section.pillItems">{{ pill }}</span>
      </div>

      <!-- Menu items -->
      <div
        class="menu-item"
        *ngFor="let item of section.items"
        [class.highlight]="item.highlight"
      >
        <!-- Row: name + price(s) -->
        <div
          class="item-row"
          [class.item-row--dual-single]="section.hasTriplePricing && section.halfRacionOnly && item.price && !item.triplePrice"
        >
          <div class="item-left">
            <span class="item-name">{{ item.name }}</span>

            <div class="allergens-inline" *ngIf="item.allergens?.length">
              <app-allergen-icon
                *ngFor="let code of item.allergens"
                [code]="code"
              ></app-allergen-icon>
            </div>
          </div>

          <!-- ½ + ración (o tapa + ½ + ración) -->
          <div
            class="prices-3"
            [class.prices-dual]="section.halfRacionOnly"
            *ngIf="section.hasTriplePricing && item.triplePrice"
          >
            <span class="p3" *ngIf="!section.halfRacionOnly && item.triplePrice.tapa">{{ item.triplePrice.tapa }}</span>
            <span class="p3">{{ item.triplePrice.media }}</span>
            <span class="p3">{{ item.triplePrice.racion }}</span>
          </div>

          <!-- Plato único: «—» en ½ y precio en ración (p. ej. ensalada mixta) -->
          <div
            class="prices-3 prices-dual"
            *ngIf="section.hasTriplePricing && section.halfRacionOnly && item.price && !item.triplePrice"
          >
            <span class="p3 p3--dash">—</span>
            <span class="p3">{{ item.price }}</span>
          </div>

          <!-- Precio único (categorías sin ½/ración) -->
          <span
            class="item-price"
            *ngIf="item.price && (!section.hasTriplePricing || !item.triplePrice) && !(section.hasTriplePricing && section.halfRacionOnly)"
          >
            {{ item.price }}
          </span>
        </div>

        <!-- Description -->
        <div class="item-desc" *ngIf="item.description">{{ item.description }}</div>

        <!-- Note -->
        <div class="item-note" *ngIf="item.note">{{ item.note }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./menu-section.component.scss'],
})
export class MenuSectionComponent {
  @Input() section!: MenuSection;
  @Input() pricingLabels: { tapa: string; half: string; racion: string } | null = null;
}
