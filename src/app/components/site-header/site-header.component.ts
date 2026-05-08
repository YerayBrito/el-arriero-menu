import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="inner">
        <a class="brand" routerLink="/" (click)="closeMenu()">
          <span class="brand-mark">⚓</span>
          <span class="brand-name">Las Salinas</span>
        </a>

        <nav class="nav" [class.open]="menuOpen()">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="closeMenu()"
          >Inicio</a>
          <a routerLink="/carta" routerLinkActive="active" (click)="closeMenu()">Carta</a>
          <a routerLink="/contacto" routerLinkActive="active" (click)="closeMenu()">Contacto</a>
        </nav>

        <button class="burger" type="button" (click)="toggle()" [attr.aria-label]="menuOpen() ? 'Cerrar menú' : 'Abrir menú'" [attr.aria-expanded]="menuOpen()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent {
  readonly menuOpen = signal(false);

  toggle(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}

