import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="wrap">
      <div class="top">
        <div class="top-copy">
          <h2>{{ 'contact.title' | t }}</h2>
          <p class="lead">
            {{ 'contact.lead' | t }}
          </p>
        </div>
        <div class="top-logo">
          <img
            src="/assets/brand/logo-las-salinas.png"
            [attr.alt]="'contact.logoAlt' | t"
            width="320"
            height="200"
            loading="lazy"
          />
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="label">{{ 'contact.addressLabel' | t }}</div>
          <div class="value">C. Churruca, 40, 35118 Arinaga, Las Palmas</div>
          <div class="hint">
            <a href="https://maps.app.goo.gl/Jss47pXqB7tWmpqn7" target="_blank" rel="noopener noreferrer">{{ 'contact.openMaps' | t }}</a>
          </div>
        </div>
        <div class="card">
          <div class="label">{{ 'contact.phoneLabel' | t }}</div>
          <div class="value">+34 000 000 000</div>
          <div class="hint">{{ 'contact.phoneHint' | t }}</div>
        </div>
        <div class="card">
          <div class="label">{{ 'contact.emailLabel' | t }}</div>
          <div class="value">
            <a href="mailto:lassalinasarinaga@gmail.com">lassalinasarinaga@gmail.com</a>
          </div>
        </div>
        <div class="card">
          <div class="label">{{ 'contact.hoursLabel' | t }}</div>
          <div class="value">L–D: 12:00–23:00</div>
          <div class="hint">{{ 'contact.hoursHint' | t }}</div>
        </div>
      </div>

      <div class="map card">
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
  `,
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {}
