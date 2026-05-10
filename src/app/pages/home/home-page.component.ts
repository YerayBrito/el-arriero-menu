import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="splash" aria-label="Próxima apertura">
      <div class="splash-bg" aria-hidden="true"></div>
      <div class="splash-overlay" aria-hidden="true"></div>

      <div class="splash-body">
        <p class="kicker">Playa de Arinaga · Gran Canaria</p>
        <div class="logo-wrap">
          <img
            class="logo"
            src="/assets/brand/logo-las-salinas.png"
            width="340"
            height="260"
            alt="Bar Las Salinas"
          />
        </div>
        <h1 class="headline">Próxima apertura</h1>
        <div class="tagline">
          <p class="tagline-line">Muy pronto abrimos junto al mar.</p>
          <p class="tagline-line tagline-thanks">Gracias por su paciencia.</p>
        </div>
        <span class="wave" aria-hidden="true"></span>
      </div>

      <p class="photo-credit">
        Foto:
        <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </p>
    </section>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}
