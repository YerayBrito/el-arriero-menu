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

  private readonly SPRITE = '/assets/allergens/sprite.svg';

  private readonly MAP: Record<AllergenCode, AllergenInfo> = {
    gluten:      { label: 'Cereales que contengan gluten', href: `${this.SPRITE}#gluten` },
    crustaceos:  { label: 'Crustáceos', href: `${this.SPRITE}#crustaceos` },
    huevo:       { label: 'Huevos', href: `${this.SPRITE}#huevo` },
    pescado:     { label: 'Pescado', href: `${this.SPRITE}#pescado` },
    lacteos:     { label: 'Leche', href: `${this.SPRITE}#lacteos` },
    frutosSecos: { label: 'Frutos de cáscara', href: `${this.SPRITE}#frutosSecos` },
    mostaza:     { label: 'Mostaza', href: `${this.SPRITE}#mostaza` },
    moluscos:    { label: 'Moluscos', href: `${this.SPRITE}#moluscos` },
    soja:        { label: 'Soja', href: `${this.SPRITE}#soja` },
    apio:        { label: 'Apio', href: `${this.SPRITE}#apio` },
    sesamo:      { label: 'Granos de sésamo', href: `${this.SPRITE}#sesamo` },
    altramuces:  { label: 'Altramuces', href: `${this.SPRITE}#altramuces` },
    sulfitos:    { label: 'Dióxido de azufre y sulfitos', href: `${this.SPRITE}#sulfitos` },
    cacahuetes:  { label: 'Cacahuetes', href: `${this.SPRITE}#cacahuetes` },
  };

  get info(): AllergenInfo {
    return this.MAP[this.code];
  }
}
