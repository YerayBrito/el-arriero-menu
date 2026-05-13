import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuSectionComponent } from '../section/menu-section.component';
import { AllergenIconComponent } from '../allergen-icon/allergen-icon.component';
import { MENU_SECTIONS } from '../../data/menu.data';
import { MenuSection } from '../../models/menu.model';
import { I18nService, AppLang } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

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
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MenuSectionComponent,
    AllergenIconComponent,
    TranslatePipe,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(I18nService);

  readonly addressLine = 'C. Churruca, 40 · 35118 Arinaga · Las Palmas';
  readonly legendCodes = LEGEND_CODES;

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const raw = params.get('lang');
      if (raw === 'es' || raw === 'en' || raw === 'de') {
        void this.i18n.useLanguage(raw as AppLang);
      }
    });
  }

  /** Vista A4 / imprimir: detectar por Router (fiable con navegación SPA). */
  isPrintView(): boolean {
    const url = this.router.url.split('?')[0].split('#')[0];
    return url === '/carta/imprimir' || url.endsWith('/carta/imprimir');
  }

  // Left column: entrantes, salsas, postres
  readonly leftSections: MenuSection[] = MENU_SECTIONS.filter(s =>
    ['entrantes', 'salsas', 'postres'].includes(s.id)
  );

  // Right column: pescados, carnes (encima de domingos en el PDF), domingos, encargo
  readonly rightSections: MenuSection[] = MENU_SECTIONS.filter(s =>
    ['pescados', 'carnes', 'domingos', 'encargo'].includes(s.id)
  );

  printMenu(): void {
    window.print();
  }
}
