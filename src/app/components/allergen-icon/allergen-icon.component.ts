import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllergenCode } from '../../models/menu.model';

interface AllergenInfo {
  label: string;
  color: string;
  text: string;
}

@Component({
  selector: 'app-allergen-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="allergen-icon"
      [style.background-color]="info.color"
      [title]="info.label"
    >{{ info.text }}</span>
  `,
  styles: [`
    .allergen-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      font-family: Arial, sans-serif;
      font-weight: 700;
      font-size: 7px;
      color: #fff;
      flex-shrink: 0;
      cursor: default;
    }
  `],
})
export class AllergenIconComponent {
  @Input() code!: AllergenCode;

  private readonly MAP: Record<AllergenCode, AllergenInfo> = {
    gluten:      { label: 'Cereales con gluten', color: '#e8720c', text: 'Gl' },
    crustaceos:  { label: 'Crustáceos',          color: '#c0392b', text: 'Cr' },
    huevo:       { label: 'Huevos',              color: '#f5c400', text: 'Hv' },
    pescado:     { label: 'Pescados',             color: '#007e9e', text: 'Pe' },
    lacteos:     { label: 'Lácteos',             color: '#7b3f9e', text: 'Le' },
    frutosSecos: { label: 'Frutos secos',        color: '#7b4a1e', text: 'Fs' },
    mostaza:     { label: 'Mostaza',             color: '#d4a017', text: 'Ms' },
    moluscos:    { label: 'Moluscos',            color: '#1a4a6e', text: 'Mo' },
    soja:        { label: 'Soja',                color: '#5a8a00', text: 'So' },
    apio:        { label: 'Apio',                color: '#4caf50', text: 'Ap' },
    sesamo:      { label: 'Sésamo',              color: '#9e7c00', text: 'Se' },
    altramuces:  { label: 'Altramuces',          color: '#f57c00', text: 'Al' },
    sulfitos:    { label: 'Sulfitos',            color: '#0288d1', text: 'Su' },
    cacahuetes:  { label: 'Cacahuetes',          color: '#a0522d', text: 'Ca' },
  };

  get info(): AllergenInfo {
    return this.MAP[this.code];
  }
}
