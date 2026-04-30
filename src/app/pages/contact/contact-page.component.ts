import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrap">
      <h2>Contacto</h2>
      <p class="lead">
        Aquí puedes poner dirección, teléfono, horario, y un enlace a Google Maps.
      </p>

      <div class="grid">
        <div class="card">
          <div class="label">Dirección</div>
          <div class="value">Playa de Arinaga · Agüimes · Gran Canaria</div>
          <div class="hint">Edita estos textos cuando quieras.</div>
        </div>
        <div class="card">
          <div class="label">Teléfono</div>
          <div class="value">+34 000 000 000</div>
          <div class="hint">Puedes cambiarlo por el número real.</div>
        </div>
        <div class="card">
          <div class="label">Horario</div>
          <div class="value">L–D: 12:00–23:00</div>
          <div class="hint">Ajusta según temporada.</div>
        </div>
      </div>

      <div class="map card">
        <div class="label">Mapa</div>
        <div class="hint">
          Añade aquí un iframe de Google Maps si quieres (o un enlace).
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {}

