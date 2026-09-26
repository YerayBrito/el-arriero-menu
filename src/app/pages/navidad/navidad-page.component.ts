import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CHRISTMAS_MENUS } from '../../data/christmas-menu.data';

const PHONE = '663 81 73 81';
const PHONE_TEL = '+34663817381';

@Component({
  selector: 'app-navidad-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-shell navidad-page">
      <header class="page-hero">
        <div class="page-hero-copy">
          <p class="xmas-kicker">🎄 Navidad {{ year }}</p>
          <h1 class="page-title">Menús de Grupo para Navidad</h1>
          <p class="page-lead">
            Comidas de empresa y grupos de amigos. Menús cerrados por persona,
            pensados para disfrutar del mar sin sorpresas en la cuenta.
          </p>
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
        @for (menu of menus; track menu.id) {
          <article class="menu-card surface-panel">
            <div class="menu-card-head">
              <h2 class="menu-name">{{ menu.nombre }}</h2>
              <div class="menu-prices">
                <div class="price-tag">
                  <span>Base</span>
                  <strong>{{ menu.priceBase }}€</strong>
                </div>
                <div class="price-tag price-tag--amp">
                  <span>Ampliado</span>
                  <strong>{{ menu.priceAmp }}€</strong>
                </div>
              </div>
            </div>

            <div class="menu-card-body">
              <div class="menu-col">
                <div class="menu-col-label">Entrantes para compartir <em>(1 ración cada 4 personas)</em></div>
                <ul class="menu-list">
                  @for (e of menu.entrantes; track e) {
                    <li>{{ e }}</li>
                  }
                </ul>
                <div class="menu-extra-line">+ Ampliado: añade <strong>{{ menu.extra }}</strong></div>
              </div>

              <div class="menu-col">
                <div class="menu-col-label">Principal a elegir <em>(1 por persona)</em></div>
                <ul class="menu-list">
                  @for (p of menu.principales; track p) {
                    <li>{{ p }}</li>
                  }
                </ul>
              </div>
            </div>

            <div class="menu-includes">
              Incluye postre, pan, alioli y mojo rojo, agua, y 1 bebida (refresco, caña o copa de vino).
              Bebida adicional aparte.
            </div>
          </article>
        }
      </div>

      <section class="terms-section surface-panel">
        <h2 class="terms-title">Condiciones de reserva</h2>
        <div class="terms-grid">
          <div class="terms-col">
            <h3>Anticipo a cuenta</h3>
            <p>Para bloquear la fecha y el número de comensales solicitamos un anticipo a cuenta del importe final:</p>
            <table class="deposit-table">
              <tr><td>Grupos de hasta 15 comensales</td><td>150€</td></tr>
              <tr><td>Grupos de más de 15 comensales</td><td>200€</td></tr>
            </table>
            <p class="small-note">Este importe se descuenta del total el día del evento.</p>
          </div>
          <div class="terms-col">
            <h3>Comensales y cancelación</h3>
            <ul>
              <li>El número definitivo de comensales debe confirmarse con un mínimo de 72 horas de antelación.</li>
              <li><strong>El importe final se calcula sobre el número confirmado</strong>, incluso si asisten menos personas.</li>
              <li>Cancelación con más de 72h: se devuelve el anticipo íntegro.</li>
              <li>Cancelación con menos de 72h, o no presentarse: el anticipo no es reembolsable.</li>
            </ul>
          </div>
        </div>
        <div class="terms-col terms-col--wide">
          <h3>Para confirmar la reserva</h3>
          <p>
            Nombre y apellidos de la persona responsable, teléfono de contacto, fecha y hora,
            número de comensales y menú elegido.
            <strong>El anticipo debe abonarse con un mínimo de 15 días de antelación a la fecha de la reserva,
            de forma presencial y con tarjeta</strong> en Las Salinas Arinaga.
          </p>
        </div>
      </section>

      <div class="cta-row">
        <a class="page-btn page-btn--primary" [href]="phoneHref">📞 Llamar al {{ phone }}</a>
        <a class="page-btn page-btn--outline" routerLink="/contacto">Ver datos de contacto</a>
      </div>
    </div>
  `,
  styleUrls: ['./navidad-page.component.scss'],
})
export class NavidadPageComponent {
  readonly menus = CHRISTMAS_MENUS;
  readonly year = new Date().getFullYear();
  readonly phone = PHONE;
  readonly phoneHref = `tel:${PHONE_TEL}`;
}
