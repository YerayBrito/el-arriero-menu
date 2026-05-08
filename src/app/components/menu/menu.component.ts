import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MenuSectionComponent } from '../section/menu-section.component';
import { AllergenIconComponent } from '../allergen-icon/allergen-icon.component';
import { MENU_SECTIONS } from '../../data/menu.data';
import { AllergenCode, MenuSection } from '../../models/menu.model';

interface LegendItem {
  code: AllergenCode;
  label: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuSectionComponent, AllergenIconComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  private readonly router = inject(Router);

  readonly restaurantName = 'LAS SALINAS';
  readonly addressLine = 'C. Churruca, 40 · 35118 Arinaga · Las Palmas';
  readonly mapsUrl = 'https://maps.app.goo.gl/Jss47pXqB7tWmpqn7';
  readonly tagline = 'Sabor que navega contigo';

  /** Vista A4 / imprimir: detectar por Router (fiable con navegación SPA). */
  isPrintView(): boolean {
    const url = this.router.url.split('?')[0].split('#')[0];
    return url === '/carta/imprimir' || url.endsWith('/carta/imprimir');
  }

  // Left column: entrantes, salsas, carnes, postres
  readonly leftSections: MenuSection[] = MENU_SECTIONS.filter(s =>
    ['entrantes', 'salsas', 'carnes', 'postres'].includes(s.id)
  );

  // Right column: pescados, domingos, encargo
  readonly rightSections: MenuSection[] = MENU_SECTIONS.filter(s =>
    ['pescados', 'domingos', 'encargo'].includes(s.id)
  );

  readonly legend: LegendItem[] = [
    // 14 alérgenos (UE 1169/2011)
    { code: 'gluten',      label: 'Cereales que contengan gluten' },
    { code: 'crustaceos',  label: 'Crustáceos' },
    { code: 'huevo',       label: 'Huevos' },
    { code: 'pescado',     label: 'Pescado' },
    { code: 'cacahuetes',  label: 'Cacahuetes' },
    { code: 'soja',        label: 'Soja' },
    { code: 'lacteos',     label: 'Leche' },
    { code: 'frutosSecos', label: 'Frutos de cáscara' },
    { code: 'apio',        label: 'Apio' },
    { code: 'mostaza',     label: 'Mostaza' },
    { code: 'sesamo',      label: 'Granos de sésamo' },
    { code: 'sulfitos',    label: 'Dióxido de azufre y sulfitos' },
    { code: 'altramuces',  label: 'Altramuces' },
    { code: 'moluscos',    label: 'Moluscos' },
  ];

  printMenu(): void {
    window.print();
  }
}
