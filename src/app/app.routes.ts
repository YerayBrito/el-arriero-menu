import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { localOnlyGuard } from './guards/local-only.guard';

/**
 * Modo “próxima apertura”: solo la portada es accesible en producción.
 * Cualquier otra URL (`/carta`, `/contacto`, …) redirige a `/`.
 *
 * Excepción: `/carta/imprimir` solo en localhost (PDF interno).
 */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },

  {
    path: 'carta/imprimir',
    loadComponent: () =>
      import('./components/menu/menu.component').then(m => m.MenuComponent),
    canMatch: [localOnlyGuard],
  },

  { path: '**', redirectTo: '' },
];

