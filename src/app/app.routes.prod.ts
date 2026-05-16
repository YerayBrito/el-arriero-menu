import { Routes } from '@angular/router';

import { HomePageComponent } from './pages/home/home-page.component';

/**
 * Producción: solo portada “próxima apertura”. Cualquier otra URL redirige a `/`.
 */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];
