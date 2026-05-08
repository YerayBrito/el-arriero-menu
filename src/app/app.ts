import { Component, inject } from '@angular/core';
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

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.syncPrintSheetClass());

    queueMicrotask(() => this.syncPrintSheetClass());
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
