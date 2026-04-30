import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <div class="badge">Playa de Arinaga · Agüimes</div>
          <h1>El Arriero</h1>
          <p class="lead">
            Cocina del mar y sabores canarios. Consulta la carta con precios y alérgenos, clara y rápida.
          </p>

          <div class="actions">
            <a class="btn primary" routerLink="/carta">Ver carta</a>
            <a class="btn ghost" routerLink="/contacto">Cómo llegar</a>
          </div>
        </div>

        <div class="hero-media" aria-hidden="true">
          <div class="photo big">
            <img src="/assets/photos/hero-1.svg" alt="" loading="lazy" />
          </div>
          <div class="photo small">
            <img src="/assets/photos/hero-2.svg" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}

