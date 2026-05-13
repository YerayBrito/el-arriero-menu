import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { localOnlyGuard } from './guards/local-only.guard';

/**
 * Rutas **desarrollo / `ng serve`**: incluye herramientas solo localhost (`/pedidos`, `/carta/imprimir`, `/editor-carta`).
 * En **`ng build` producción** este fichero lo sustituye `app.routes.prod.ts` (no se publica ese código).
 */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },

  {
    path: 'carta/imprimir',
    loadComponent: () =>
      import('./components/menu/menu.component').then(m => m.MenuComponent),
    canMatch: [localOnlyGuard],
  },

  {
    path: 'editor-carta',
    loadComponent: () =>
      import('./pages/menu-editor-local/menu-editor-local-page.component').then(
        m => m.MenuEditorLocalPageComponent
      ),
    canMatch: [localOnlyGuard],
  },

  {
    path: 'pedidos',
    loadComponent: () =>
      import('./pages/pedidos-local/pedidos-local-page.component').then(
        m => m.PedidosLocalPageComponent
      ),
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
      import('./pages/contact/contact-page.component').then(
        m => m.ContactPageComponent
      ),
  },

  { path: '**', redirectTo: '' },
];

