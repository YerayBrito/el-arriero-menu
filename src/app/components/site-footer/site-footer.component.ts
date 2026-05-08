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
        <span class="muted">Precios con IVA incluido · Consulte al personal si padece alergias o intolerancias</span>
      </div>
    </footer>
  `,
  styleUrls: ['./site-footer.component.scss'],
})
export class SiteFooterComponent {}

