import { inject, isDevMode } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

/** Loopback / host típico de `ng serve`. */
function isLocalHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    hostname === '::1' ||
    hostname === '0.0.0.0'
  );
}

/** Misma WiFi (p. ej. móvil contra `ng serve --host 0.0.0.0`). */
function isPrivateLanIPv4(hostname: string): boolean {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(hostname);
  if (!m) return false;
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

/**
 * Carta, contacto, PDF interno: visibles solo fuera del despliegue público.
 * - `ng serve` (isDevMode)
 * - localhost / 127.0.0.1 / IPv6 loopback
 * - IP privada (LAN), por si el build no marca dev pero pruebas en casa
 */
function isLocalPreviewContext(hostname: string): boolean {
  if (isDevMode()) return true;
  return isLocalHostname(hostname) || isPrivateLanIPv4(hostname);
}

/** Rutas que no deben existir en el dominio de producción. */
export const localOnlyGuard: CanMatchFn = () => {
  const router = inject(Router);

  try {
    const hostname = window.location.hostname;
    return isLocalPreviewContext(hostname) ? true : router.parseUrl('/');
  } catch {
    return router.parseUrl('/');
  }
};

