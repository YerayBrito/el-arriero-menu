import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrap">
      <div class="top">
        <div class="top-copy">
          <h2>Contacto</h2>
          <p class="lead">
            Cómo llegar, horario y datos de contacto.
          </p>
        </div>
        <div class="top-logo">
          <img
            src="/assets/brand/logo-las-salinas.png"
            alt="Las Salinas"
            width="320"
            height="200"
            loading="lazy"
          />
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="label">Dirección</div>
          <div class="value">C. Churruca, 40, 35118 Arinaga, Las Palmas</div>
          <div class="hint">
            <a href="https://maps.app.goo.gl/Jss47pXqB7tWmpqn7" target="_blank" rel="noopener noreferrer">Abrir en Google Maps</a>
          </div>
        </div>
        <div class="card">
          <div class="label">Teléfono</div>
          <div class="value">+34 000 000 000</div>
          <div class="hint">Puedes cambiarlo por el número real.</div>
        </div>
        <div class="card">
          <div class="label">Correo</div>
          <div class="value">
            <a href="mailto:lassalinasarinaga@gmail.com">lassalinasarinaga@gmail.com</a>
          </div>
        </div>
        <div class="card">
          <div class="label">Horario</div>
          <div class="value">L–D: 12:00–23:00</div>
          <div class="hint">Ajusta según temporada.</div>
        </div>
      </div>

      <div class="map card">
        <div class="label">Mapa</div>
        <div class="hint">También puedes abrirlo en Google Maps si lo prefieres.</div>
        <div class="map-frame" role="region" aria-label="Mapa de Las Salinas">
          <iframe
            title="Mapa de Las Salinas"
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

