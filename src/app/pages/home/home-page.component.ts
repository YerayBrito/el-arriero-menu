import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <section class="hero" [attr.aria-label]="'home.ariaHero' | t">
      <div class="sea-decor" aria-hidden="true">
        <span class="sea-sprite sea-sprite--a">🐟</span>
        <span class="sea-sprite sea-sprite--b">🦐</span>
        <span class="sea-sprite sea-sprite--c">🐠</span>
        <span class="sea-sprite sea-sprite--d">🐟</span>
      </div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <div class="badge">{{ 'home.badge' | t }}</div>
          <h1>{{ 'home.title' | t }}</h1>
          <p class="lead">
            {{ 'home.lead' | t }}
          </p>

          <div class="actions">
            <a class="btn primary" routerLink="/carta">{{ 'home.ctaMenu' | t }}</a>
            <a class="btn ghost" routerLink="/contacto">{{ 'home.ctaContact' | t }}</a>
          </div>
        </div>

        <div class="hero-media">
          <img
            class="hero-logo"
            src="/assets/brand/logo-las-salinas.png"
            [attr.alt]="'home.logoAlt' | t"
          />
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}
