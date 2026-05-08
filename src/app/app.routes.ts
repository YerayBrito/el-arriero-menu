import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { MenuPageComponent } from './pages/menu/menu-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { localOnlyGuard } from './guards/local-only.guard';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'carta', component: MenuPageComponent },
  { path: 'contacto', component: ContactPageComponent },

  /**
   * Carta PDF / imprimir: solo en localhost (ver localOnlyGuard).
   * En producción no existe esta ruta para usuarios; el chunk solo se carga en desarrollo al entrar aquí.
   */
  {
    path: 'carta/imprimir',
    loadComponent: () =>
      import('./components/menu/menu.component').then(m => m.MenuComponent),
    canMatch: [localOnlyGuard],
  },

  { path: '**', redirectTo: '' },
];

