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
        <a class="brand" routerLink="/">
          <span class="brand-mark">⚓</span>
          <span class="brand-name">El Arriero</span>
        </a>

        <nav class="nav" [class.open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
          <a routerLink="/carta" routerLinkActive="active">Carta</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
        </nav>

        <button class="burger" type="button" (click)="toggle()" aria-label="Abrir menú">
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
}

