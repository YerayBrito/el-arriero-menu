import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';
import { MenuPageComponent } from './pages/menu/menu-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';

/** Producción: inicio, carta y contacto. */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: 'carta', component: MenuPageComponent },
  { path: 'contacto', component: ContactPageComponent },
  { path: '**', redirectTo: '' },
];
