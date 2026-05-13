import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';

/**
 * Rutas del build de **producción**: sin `/pedidos` ni `/carta/imprimir`.
 * Esas pantallas no se empaquetan en el bundle público (sustituyen a `app.routes.ts` vía `angular.json`).
 */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },

  {
    path: 'carta',
    loadComponent: () =>
      import('./pages/menu/menu-page.component').then(m => m.MenuPageComponent),
  },

  {
    path: 'contacto',
    loadComponent: () =>
      import('./pages/contact/contact-page.component').then(
        m => m.ContactPageComponent
      ),
  },

  { path: '**', redirectTo: '' },
];
