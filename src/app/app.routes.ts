import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { localOnlyGuard } from './guards/local-only.guard';

/**
 * Desarrollo (`ng serve`): portada pública + herramientas solo en local.
 * `/carta`, `/contacto`, etc. redirigen a la portada (como en producción).
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

  { path: '**', redirectTo: '' },
];
