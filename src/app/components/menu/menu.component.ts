import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, MenuSectionComponent, AllergenIconComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  readonly restaurantName = 'EL ARRIERO';
  readonly tagline = 'Cocina del Mar · Playa de Arinaga · Agüimes · Gran Canaria';

  // Left column: entrantes, salsas, carnes, postres
  readonly leftSections: MenuSection[] = MENU_SECTIONS.filter(s =>
    ['entrantes', 'salsas', 'carnes', 'postres'].includes(s.id)
  );

  // Right column: pescados, domingos, encargo
  readonly rightSections: MenuSection[] = MENU_SECTIONS.filter(s =>
    ['pescados', 'domingos', 'encargo'].includes(s.id)
  );

  readonly legend: LegendItem[] = [
    { code: 'gluten',      label: 'Cereales/Gluten' },
    { code: 'crustaceos',  label: 'Crustáceos' },
    { code: 'huevo',       label: 'Huevos' },
    { code: 'pescado',     label: 'Pescados' },
    { code: 'lacteos',     label: 'Lácteos' },
    { code: 'frutosSecos', label: 'Frutos secos' },
    { code: 'mostaza',     label: 'Mostaza' },
    { code: 'moluscos',    label: 'Moluscos' },
  ];

  printMenu(): void {
    window.print();
  }
}
