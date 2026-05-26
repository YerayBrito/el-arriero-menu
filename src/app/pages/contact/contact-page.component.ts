import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';

const MAPS_URL = 'https://maps.app.goo.gl/Jss47pXqB7tWmpqn7';
const EMAIL = 'lassalinasarinaga@gmail.com';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="page-shell contact-page">
      <header class="page-hero">
        <div class="page-hero-copy">
          <h1 class="page-title">{{ 'contact.title' | t }}</h1>
          <p class="page-lead">{{ 'contact.lead' | t }}</p>
        </div>
        <div class="page-hero-logo">
          <img
            src="/assets/brand/logo-las-salinas.png"
            [attr.alt]="'contact.logoAlt' | t"
            width="320"
            height="200"
            loading="lazy"
          />
        </div>
      </header>

      <div class="grid">
        <a
          class="card card-link surface-panel"
          [href]="mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="'contact.openMaps' | t"
        >
          <span class="card-icon" aria-hidden="true">📍</span>
          <div class="label">{{ 'contact.addressLabel' | t }}</div>
          <div class="value">C. Churruca, 40, 35118 Arinaga, Las Palmas</div>
          <div class="hint hint--action">{{ 'contact.openMaps' | t }}</div>
        </a>

        <a
          class="card card-link surface-panel"
          [href]="emailHref"
          [attr.aria-label]="'contact.emailLabel' | t"
        >
          <span class="card-icon" aria-hidden="true">✉️</span>
          <div class="label">{{ 'contact.emailLabel' | t }}</div>
          <div class="value">{{ email }}</div>
        </a>

        <div class="card card--wide surface-panel">
          <span class="card-icon" aria-hidden="true">🕐</span>
          <div class="label">{{ 'contact.hoursLabel' | t }}</div>
          <div class="value value--hours">{{ 'contact.hoursValue' | t }}</div>
        </div>

        <div class="map card surface-panel">
          <span class="card-icon" aria-hidden="true">🗺</span>
          <div class="label">{{ 'contact.mapLabel' | t }}</div>
          <div class="hint">{{ 'contact.mapHint' | t }}</div>
          <div class="map-frame" role="region" [attr.aria-label]="'contact.mapRegion' | t">
            <iframe
              [attr.title]="'contact.mapIframeTitle' | t"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=C.%20Churruca%2C%2040%2C%2035118%20Arinaga%2C%20Las%20Palmas&output=embed"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {
  readonly mapsUrl = MAPS_URL;
  readonly email = EMAIL;
  readonly emailHref = `mailto:${EMAIL}`;
}
