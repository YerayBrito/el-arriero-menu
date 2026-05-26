import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllergenCode } from '../../models/menu.model';

interface AllergenInfo {
  label: string;
  href: string;
}

@Component({
  selector: 'app-allergen-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      class="allergen-icon"
      role="img"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      [attr.aria-label]="info.label"
      focusable="false"
    >
      <title>{{ info.label }}</title>
      <use [attr.href]="info.href" [attr.xlink:href]="info.href"></use>
    </svg>
  `,
  styles: [`
    .allergen-icon {
      display: inline-block;
      width: 11px;
      height: 11px;
      flex-shrink: 0;
      cursor: default;
    }
  `],
})
export class AllergenIconComponent {
  @Input() code!: AllergenCode;

  /* Referencia interna (#id): imprime en Chrome; el sprite está en index.html */
  private readonly MAP: Record<AllergenCode, AllergenInfo> = {
    gluten:      { label: 'Cereales que contengan gluten', href: '#gluten' },
    crustaceos:  { label: 'Crustáceos', href: '#crustaceos' },
    huevo:       { label: 'Huevos', href: '#huevo' },
    pescado:     { label: 'Pescado', href: '#pescado' },
    lacteos:     { label: 'Leche', href: '#lacteos' },
    frutosSecos: { label: 'Frutos de cáscara', href: '#frutosSecos' },
    mostaza:     { label: 'Mostaza', href: '#mostaza' },
    moluscos:    { label: 'Moluscos', href: '#moluscos' },
    soja:        { label: 'Soja', href: '#soja' },
    apio:        { label: 'Apio', href: '#apio' },
    sesamo:      { label: 'Granos de sésamo', href: '#sesamo' },
    altramuces:  { label: 'Altramuces', href: '#altramuces' },
    sulfitos:    { label: 'Dióxido de azufre y sulfitos', href: '#sulfitos' },
    cacahuetes:  { label: 'Cacahuetes', href: '#cacahuetes' },
  };

  get info(): AllergenInfo {
    return this.MAP[this.code];
  }
}
