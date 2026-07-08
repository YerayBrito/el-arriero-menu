import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { SectionIconComponent } from '../../components/section-icon/section-icon.component';

const MAPS_URL = 'https://maps.app.goo.gl/LUKdof4ZQGZCkHcC7';
const PHONE = '644 33 17 41';
const PHONE_TEL = '+34644331741';
const EMAIL = 'lassalinasarinaga@gmail.com';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SectionIconComponent],
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

        <div class="card surface-panel">
          <app-section-icon class="card-icon-lucide" icon="encargo" aria-hidden="true" />
          <div class="label">{{ 'contact.contactLabel' | t }}</div>
          <div class="contact-lines">
            <a class="contact-line" [href]="phoneHref" [attr.aria-label]="'contact.phoneLabel' | t">
              <span class="contact-line-label">{{ 'contact.phoneLabel' | t }}</span>
              <span class="value">{{ phone }}</span>
            </a>
            <a class="contact-line" [href]="emailHref" [attr.aria-label]="'contact.emailLabel' | t">
              <span class="contact-line-label">{{ 'contact.emailLabel' | t }}</span>
              <span class="value">{{ email }}</span>
            </a>
          </div>
        </div>

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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.446604977904!2d-15.3901381!3d27.8575194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40a1cf61f8fb79%3A0xe93807b7aff1604a!2sBar%20Las%20Salinas%20Arinaga!5e0!3m2!1ses!2ses!4v1748611200000!5m2!1ses!2ses"
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
  readonly phone = PHONE;
  readonly phoneHref = `tel:${PHONE_TEL}`;
  readonly email = EMAIL;
  readonly emailHref = `mailto:${EMAIL}`;
}
