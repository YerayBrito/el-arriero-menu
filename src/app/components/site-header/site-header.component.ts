import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppLang, I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  template: `
    <header class="header">
      <div class="inner">
        <a class="brand" routerLink="/" (click)="closeMenu()">
          <span class="brand-mark">⚓</span>
          <span class="brand-name">Las Salinas</span>
        </a>

        <nav class="nav" [class.open]="menuOpen()">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="closeMenu()"
          >{{ 'nav.home' | t }}</a>
        </nav>

        <div class="lang" role="group" [attr.aria-label]="'nav.langPicker' | t">
          @for (l of langs; track l) {
            <button
              type="button"
              class="lang-btn"
              [class.active]="i18n.lang() === l"
              (click)="pickLang(l)"
            >{{ ('lang.' + l) | t }}</button>
          }
        </div>

        <button
          class="burger"
          type="button"
          (click)="toggle()"
          [attr.aria-label]="menuOpen() ? ('nav.closeMenu' | t) : ('nav.openMenu' | t)"
          [attr.aria-expanded]="menuOpen()"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,
  styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent {
  readonly menuOpen = signal(false);
  readonly i18n = inject(I18nService);
  readonly langs: AppLang[] = ['es', 'en', 'de'];

  toggle(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  async pickLang(lang: AppLang): Promise<void> {
    await this.i18n.useLanguage(lang);
  }
}
