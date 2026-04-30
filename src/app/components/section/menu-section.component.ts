import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuSection } from '../../models/menu.model';
import { AllergenIconComponent } from '../allergen-icon/allergen-icon.component';

@Component({
  selector: 'app-menu-section',
  standalone: true,
  imports: [CommonModule, AllergenIconComponent],
  template: `
    <div class="section">
      <div class="section-header">
        <span class="section-icon">{{ section.icon }}</span>
        <span class="section-title">{{ section.title }}</span>
        <span class="section-deco">✦</span>
      </div>

      <!-- Triple price header for entrantes -->
      <div class="price-header" *ngIf="section.hasTriplePricing">
        <span class="ph-label">Tapa</span>
        <span class="ph-label">½ Rac.</span>
        <span class="ph-label">Rac.</span>
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
        <div class="item-row">
          <span class="item-name">{{ item.name }}</span>

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
        <div class="item-desc" *ngIf="item.description">{{ item.description }}</div>

        <!-- Note -->
        <div class="item-note" *ngIf="item.note">{{ item.note }}</div>

        <!-- Allergens — always last -->
        <div class="allergens" *ngIf="item.allergens?.length">
          <app-allergen-icon
            *ngFor="let code of item.allergens"
            [code]="code"
          ></app-allergen-icon>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./menu-section.component.scss'],
})
export class MenuSectionComponent {
  @Input() section!: MenuSection;
}
