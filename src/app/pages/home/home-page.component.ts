import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLang, I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <section class="splash" [attr.aria-label]="'home.ariaSplash' | t">
      <div class="splash-bg" aria-hidden="true"></div>
      <div class="splash-overlay" aria-hidden="true"></div>

      <div
        class="splash-lang"
        role="group"
        [attr.aria-label]="'nav.langPicker' | t"
      >
        @for (l of langs; track l) {
          <button
            type="button"
            class="splash-lang-btn"
            [class.active]="i18n.lang() === l"
            (click)="pickLang(l)"
          >{{ ('lang.' + l) | t }}</button>
        }
      </div>

      <div class="splash-body">
        <p class="kicker">{{ 'home.kicker' | t }}</p>
        <div class="logo-wrap">
          <img
            class="logo"
            src="/assets/brand/logo-las-salinas.png"
            width="340"
            height="260"
            [attr.alt]="'home.logoAlt' | t"
          />
        </div>
        <h1 class="headline">{{ 'home.headline' | t }}</h1>
        <div class="tagline">
          <p class="tagline-line">{{ 'home.line1' | t }}</p>
          <p class="tagline-line tagline-thanks">{{ 'home.line2' | t }}</p>
        </div>
        <span class="wave" aria-hidden="true"></span>
      </div>

      <p class="photo-credit">
        {{ 'home.photoCredit' | t }}
        <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </p>
    </section>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  readonly i18n = inject(I18nService);
  readonly langs: AppLang[] = ['es', 'en', 'de'];

  async pickLang(lang: AppLang): Promise<void> {
    await this.i18n.useLanguage(lang);
  }
}
