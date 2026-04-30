import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

function isLocalHostname(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

export const localOnlyGuard: CanMatchFn = () => {
  const router = inject(Router);

  // En caso de entornos no-browser (o si falla), bloqueamos por seguridad.
  try {
    const hostname = window.location.hostname;
    return isLocalHostname(hostname) ? true : router.parseUrl('/');
  } catch {
    return router.parseUrl('/');
  }
};

