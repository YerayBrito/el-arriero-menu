import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { I18nService } from './i18n/i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideAppInitializer(() => {
      const i18n = inject(I18nService);
      return i18n.loadInitialLanguage();
    }),
  ]
};
