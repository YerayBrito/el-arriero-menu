import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSection } from '../../models/menu.model';
import { AllergenIconComponent } from '../allergen-icon/allergen-icon.component';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule, AllergenIconComponent, TranslatePipe],
  template: `
    <div class="section">
      <div class="section-header">
        <span class="section-icon">{{ section.icon }}</span>
        <span class="section-title">{{ secTitle(section) }}</span>
        <span class="section-deco">✦</span>
      </div>

      <!-- Triple price header for entrantes -->
      <div class="price-header" *ngIf="section.hasTriplePricing">
        <span class="ph-label">{{ 'menu.print.colTapa' | t }}</span>
        <span class="ph-label">{{ 'menu.print.colHalf' | t }}</span>
        <span class="ph-label">{{ 'menu.print.colRacion' | t }}</span>
      </div>

      <!-- Menu items -->
      <div
        class="menu-item"
        *ngFor="let item of section.items; let i = index"
        [class.highlight]="item.highlight"
      >
        <!-- Row: name + price(s) -->
        <div class="item-row">
          <div class="item-left">
            <span class="item-name">{{ itemName(section, i, item.name) }}</span>

            <!-- Allergens inline, right after name -->
            <div class="allergens-inline" *ngIf="item.allergens?.length">
              <app-allergen-icon
                *ngFor="let code of item.allergens"
                [code]="code"
              ></app-allergen-icon>
            </div>
          </div>

          <!-- Triple price -->
          <div class="prices-3" *ngIf="section.hasTriplePricing && item.triplePrice">
            <span class="p3">{{ item.triplePrice.tapa }}</span>
            <span class="p3">{{ item.triplePrice.media }}</span>
            <span class="p3">{{ item.triplePrice.racion }}</span>
          </div>

          <!-- Single price -->
          <span class="item-price" *ngIf="!section.hasTriplePricing && item.price">
            {{ item.price }}
          </span>
        </div>

        <!-- Description -->
        <div class="item-desc" *ngIf="itemDesc(section, i, item.description)">
          {{ itemDesc(section, i, item.description) }}
        </div>

        <!-- Note -->
        <div class="item-note" *ngIf="itemNote(section, i, item.note)">
          {{ itemNote(section, i, item.note) }}
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./menu-section.component.scss'],
})
export class MenuSectionComponent {
  @Input() section!: MenuSection;

  private readonly i18n = inject(I18nService);

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
}
