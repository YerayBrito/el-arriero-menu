import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  template: `
    @if (showSiteChrome()) {
      <app-site-header></app-site-header>
    }
    <main class="site-main" [class.site-main--splash]="!showSiteChrome()">
      <router-outlet></router-outlet>
    </main>
    @if (showSiteChrome()) {
      <app-site-footer></app-site-footer>
    }
  `,
})
export class App {
  private readonly router = inject(Router);

  /** En la portada solo se muestra la pantalla de próxima apertura (sin menú ni pie). */
  readonly showSiteChrome = signal(true);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.syncLayoutAfterNav());

    queueMicrotask(() => this.syncLayoutAfterNav());
  }

  private syncLayoutAfterNav(): void {
    this.syncPrintSheetClass();
    this.syncHomeSplashChrome();
  }

  private syncHomeSplashChrome(): void {
    const path = this.router.url.split('?')[0].split('#')[0];
    const isHome = path === '/' || path === '';
    this.showSiteChrome.set(!isHome);
  }

  /** Solo en /carta/imprimir: al imprimir, el CSS oculta header/footer y deja solo la hoja A4. */
  private syncPrintSheetClass(): void {
    if (typeof document === 'undefined') return;
    const path = this.router.url.split('?')[0].split('#')[0];
    const onSheet =
      path === '/carta/imprimir' || path.endsWith('/carta/imprimir');
    document.documentElement.classList.toggle('print-sheet-only', onSheet);
    document.body.classList.toggle('print-sheet-only', onSheet);
  }
}
