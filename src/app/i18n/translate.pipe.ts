import { Pipe, PipeTransform, inject } from '@angular/core';
import { I18nService } from './i18n.service';

/** `pure: false` para que al cambiar el idioma se vuelva a traducir aunque la clave sea la misma. */
@Pipe({
  name: 't',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(I18nService);

  transform(key: string): string {
    this.i18n.lang();
    return this.i18n.t(key);
  }
}
