import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  template: `
    <app-site-header></app-site-header>
    <main class="site-main">
      <router-outlet></router-outlet>
    </main>
    <app-site-footer></app-site-footer>
  `,
})
export class App {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.syncLayoutAfterNav());

    queueMicrotask(() => this.syncLayoutAfterNav());

    // iOS Safari: el “pull-to-refresh” no respeta overscroll-behavior.
    // Bloqueamos el gesto solo cuando estás arriba del todo.
    if (isPlatformBrowser(this.platformId)) this.disablePullToRefreshIOS();
  }

  private syncLayoutAfterNav(): void {
    this.syncPrintSheetClass();
    this.syncPedidosKioskClass();
  }

  private disablePullToRefreshIOS(): void {
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      const dy = y - startY;
      if (dy <= 0) return;

      const el = document.scrollingElement;
      if (!el) return;
      if (el.scrollTop > 0) return;

      // Si estás arriba del todo y arrastras hacia abajo, cancelamos el refresh.
      e.preventDefault();
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
  }

  /** Vista /pedidos: pantalla completa (sin cabecera web). */
  private syncPedidosKioskClass(): void {
    if (typeof document === 'undefined') return;
    const path = this.router.url.split('?')[0].split('#')[0];
    const onPedidos = path === '/pedidos' || path.endsWith('/pedidos');
    document.documentElement.classList.toggle('pedidos-kiosk', onPedidos);
  }

  /** Solo en /carta/imprimir: al imprimir, el CSS oculta header/footer. */
  private syncPrintSheetClass(): void {
    if (typeof document === 'undefined') return;
    const path = this.router.url.split('?')[0].split('#')[0];
    const onSheet =
      path === '/carta/imprimir' || path.endsWith('/carta/imprimir');
    document.documentElement.classList.toggle('print-sheet-only', onSheet);
    document.body.classList.toggle('print-sheet-only', onSheet);
  }
}
