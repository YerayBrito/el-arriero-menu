import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="hero">
      <div class="sea-decor" aria-hidden="true">
        <span class="sea-sprite sea-sprite--a">🐟</span>
        <span class="sea-sprite sea-sprite--b">🦐</span>
        <span class="sea-sprite sea-sprite--c">🐠</span>
        <span class="sea-sprite sea-sprite--d">🐟</span>
      </div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <div class="badge">Arinaga · Las Palmas</div>
          <h1>Las Salinas</h1>
          <p class="lead">
            Cocina del mar y sabores canarios. Consulta la carta con precios y alérgenos, clara y rápida.
          </p>

          <div class="actions">
            <a class="btn primary" routerLink="/carta">Ver carta</a>
            <a class="btn ghost" routerLink="/contacto">Cómo llegar</a>
          </div>
        </div>

        <div class="hero-media">
          <img class="hero-logo" src="/assets/brand/logo-las-salinas.png" alt="Logo de Las Salinas" />
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}

