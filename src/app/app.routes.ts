import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { localOnlyGuard } from './guards/local-only.guard';

/** `/carta/imprimir` solo en local / dev / LAN (PDF interno). Resto del sitio es público. */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },

  {
    path: 'carta/imprimir',
    loadComponent: () =>
      import('./components/menu/menu.component').then(m => m.MenuComponent),
    canMatch: [localOnlyGuard],
  },
  {
    path: 'carta',
    loadComponent: () =>
      import('./pages/menu/menu-page.component').then(m => m.MenuPageComponent),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent),
  },

  { path: '**', redirectTo: '' },
];

