import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <section class="hero" [attr.aria-label]="'home.ariaSplash' | t">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-overlay" aria-hidden="true"></div>

      <div class="hero-body">
        <p class="kicker">{{ 'home.kicker' | t }}</p>
        <div class="logo-wrap">
          <img
            class="logo"
            src="/assets/brand/logo-las-salinas.png"
            width="340"
            height="260"
            [attr.alt]="'home.logoAlt' | t"
          />
        </div>
        <h1 class="headline">{{ 'home.headline' | t }}</h1>
        <p class="tagline">{{ 'home.tagline' | t }}</p>
        <div class="hero-actions">
          <a class="btn-primary" routerLink="/carta">{{ 'home.ctaMenu' | t }}</a>
          <a class="btn-outline" routerLink="/contacto">{{ 'home.ctaContact' | t }}</a>
        </div>
        <span class="wave" aria-hidden="true"></span>
      </div>

      <p class="photo-credit">{{ 'home.photoCaption' | t }}</p>
    </section>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}
