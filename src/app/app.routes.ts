import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { MenuPageComponent } from './pages/menu/menu-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { MenuComponent } from './components/menu/menu.component';
import { localOnlyGuard } from './guards/local-only.guard';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'carta', component: MenuPageComponent },
  { path: 'contacto', component: ContactPageComponent },

  // Vista optimizada para imprimir / PDF
  { path: 'carta/imprimir', component: MenuComponent, canMatch: [localOnlyGuard] },

  { path: '**', redirectTo: '' },
];

