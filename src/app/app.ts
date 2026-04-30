import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
export class App {}
