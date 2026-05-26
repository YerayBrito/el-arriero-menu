import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <footer class="footer">
      <div class="inner">
        <div class="col">
          <div class="name">Las Salinas Arinaga</div>
          <div class="muted">C. Churruca, 40 · 35118 Arinaga · Las Palmas</div>
          <a
            class="muted"
            href="https://maps.app.goo.gl/Jss47pXqB7tWmpqn7"
            target="_blank"
            rel="noopener noreferrer"
          >{{ 'footer.mapsLink' | t }}</a>
          <a class="muted mail" href="mailto:lassalinasarinaga@gmail.com">lassalinasarinaga@gmail.com</a>
        </div>
        <div class="col links">
          <a routerLink="/carta">{{ 'footer.navMenu' | t }}</a>
          <a routerLink="/contacto">{{ 'footer.navContact' | t }}</a>
        </div>
      </div>
      <div class="bottom">
        <p class="muted notice">
          {{ 'footer.notice' | t }}
        </p>
        <p class="copyright">
          © {{ year }} {{ 'footer.copyright' | t }}
        </p>
        <p class="legal">
          {{ 'footer.legal' | t }}
        </p>
      </div>
    </footer>
  `,
  styleUrls: ['./site-footer.component.scss'],
})
export class SiteFooterComponent {
  readonly year = new Date().getFullYear();
}
