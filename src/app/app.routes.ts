import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { MenuPageComponent } from './pages/menu/menu-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { localOnlyGuard } from './guards/local-only.guard';

/**
 * Rutas públicas: inicio, carta y contacto.
 * Herramientas solo en local: `/editor-carta`, `/pedidos`, `/carta/imprimir`.
 */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'carta', component: MenuPageComponent },
  { path: 'contacto', component: ContactPageComponent },

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
