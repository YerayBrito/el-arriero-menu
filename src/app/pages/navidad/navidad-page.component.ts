import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { I18nService } from '../../i18n/i18n.service';
import { CHRISTMAS_MENUS, localizedList, localizedText } from '../../data/christmas-menu.data';

const PHONE = '663 81 73 81';
const PHONE_TEL = '+34663817381';

@Component({
  selector: 'app-navidad-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <div class="page-shell navidad-page">
      <header class="page-hero">
        <div class="page-hero-copy">
          <p class="xmas-kicker">{{ kickerText() }}</p>
          <h1 class="page-title">{{ 'navidad.title' | t }}</h1>
          <p class="page-lead">{{ 'navidad.lead' | t }}</p>
        </div>
        <div class="page-hero-logo">
          <img
            src="/assets/brand/logo-las-salinas.png"
            alt="Las Salinas Arinaga"
            width="320"
            height="200"
            loading="lazy"
          />
        </div>
      </header>

      <div class="menus-grid">
        @for (menu of menus(); track menu.id) {
          <article class="menu-card surface-panel">
            <div class="menu-card-head">
              <h2 class="menu-name">{{ menu.nombre }}</h2>
              <div class="menu-prices">
                <div class="price-tag">
                  <span>{{ 'navidad.priceBaseLabel' | t }}</span>
                  <strong>{{ menu.priceBase }}€</strong>
                </div>
                <div class="price-tag price-tag--amp">
                  <span>{{ 'navidad.priceAmpLabel' | t }}</span>
                  <strong>{{ menu.priceAmp }}€</strong>
                </div>
              </div>
            </div>

            <div class="menu-card-body">
              <div class="menu-col">
                <div class="menu-col-label">{{ 'navidad.entrantesLabel' | t }} <em>{{ 'navidad.entrantesNote' | t }}</em></div>
                <ul class="menu-list">
                  @for (e of menu.entrantes; track e) {
                    <li>{{ e }}</li>
                  }
                </ul>
                <div class="menu-extra-line">{{ 'navidad.ampliadoPrefix' | t }} <strong>{{ menu.extra }}</strong></div>
              </div>

              <div class="menu-col">
                <div class="menu-col-label">{{ 'navidad.principalLabel' | t }} <em>{{ 'navidad.principalNote' | t }}</em></div>
                <ul class="menu-list">
                  @for (p of menu.principales; track p) {
                    <li>{{ p }}</li>
                  }
                </ul>
              </div>
            </div>

            <div class="menu-includes">{{ 'navidad.includesText' | t }}</div>
          </article>
        }
      </div>

      <section class="terms-section surface-panel">
        <h2 class="terms-title">{{ 'navidad.termsTitle' | t }}</h2>
        <div class="terms-grid">
          <div class="terms-col">
            <h3>{{ 'navidad.depositTitle' | t }}</h3>
            <p>{{ 'navidad.depositIntro' | t }}</p>
            <table class="deposit-table">
              <tr><td>{{ 'navidad.depositUpTo15' | t }}</td><td>150€</td></tr>
              <tr><td>{{ 'navidad.depositMoreThan15' | t }}</td><td>200€</td></tr>
            </table>
            <p class="small-note">{{ 'navidad.depositNote' | t }}</p>
          </div>
          <div class="terms-col">
            <h3>{{ 'navidad.guestsTitle' | t }}</h3>
            <ul>
              <li><strong>{{ 'navidad.minGuests' | t }}</strong></li>
              <li>{{ 'navidad.guestsConfirm' | t }}</li>
              <li [innerHTML]="'navidad.guestsFinalAmount' | t"></li>
              <li>{{ 'navidad.cancelOk' | t }}</li>
              <li>{{ 'navidad.cancelLate' | t }}</li>
            </ul>
          </div>
        </div>
        <div class="terms-col terms-col--wide">
          <h3>{{ 'navidad.confirmTitle' | t }}</h3>
          <p [innerHTML]="'navidad.confirmText' | t"></p>
        </div>
      </section>

      <div class="cta-row">
        <a class="page-btn page-btn--primary" [href]="phoneHref">📞 {{ callCtaText() }}</a>
        <a class="page-btn page-btn--outline" routerLink="/contacto">{{ 'navidad.contactCta' | t }}</a>
      </div>
    </div>
  `,
  styleUrls: ['./navidad-page.component.scss'],
})
export class NavidadPageComponent {
  private readonly i18n = inject(I18nService);

  readonly year = new Date().getFullYear();
  readonly phone = PHONE;
  readonly phoneHref = `tel:${PHONE_TEL}`;

  readonly menus = computed(() => {
    const lang = this.i18n.lang();
    return CHRISTMAS_MENUS.map(m => ({
      id: m.id,
      nombre: localizedText(m.nombre, lang),
      entrantes: localizedList(m.entrantes, lang),
      extra: localizedText(m.extra, lang),
      principales: localizedList(m.principales, lang),
      priceBase: m.priceBase,
      priceAmp: m.priceAmp,
    }));
  });

  readonly kickerText = computed(() =>
    this.i18n.t('navidad.kicker').replace('{{year}}', String(this.year)),
  );

  readonly callCtaText = computed(() => {
    this.i18n.lang();
    return this.i18n.t('navidad.callCta').replace('{{phone}}', this.phone);
  });
}
