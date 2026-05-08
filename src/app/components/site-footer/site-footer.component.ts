import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="inner">
        <div class="col">
          <div class="name">Las Salinas</div>
          <div class="muted">C. Churruca, 40 · 35118 Arinaga · Las Palmas</div>
          <a
            class="muted"
            href="https://maps.app.goo.gl/Jss47pXqB7tWmpqn7"
            target="_blank"
            rel="noopener noreferrer"
          >Ver en Google Maps</a>
        </div>
        <div class="col links">
          <a routerLink="/carta">Carta</a>
          <a routerLink="/contacto">Contacto</a>
        </div>
      </div>
      <div class="bottom">
        <p class="muted notice">
          Precios con IGIC incluido · Consulte al personal si padece alergias o intolerancias
        </p>
        <p class="copyright">
          © {{ year }} Bar Las Salinas · Arinaga · Todos los derechos reservados.
        </p>
        <p class="legal">
          Los contenidos de este sitio web (textos, diseño, carta e imágenes) son propiedad de Bar Las Salinas · Arinaga.
          Queda prohibida su copia, reproducción o uso comercial sin autorización previa por escrito.
        </p>
      </div>
    </footer>
  `,
  styleUrls: ['./site-footer.component.scss'],
})
export class SiteFooterComponent {
  readonly year = new Date().getFullYear();
}

