import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import {
  HOME_CAROUSEL_IMAGES,
  HOME_CAROUSEL_INTERVAL_MS,
} from '../../data/home-carousel.data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <section class="hero" [attr.aria-label]="'home.ariaSplash' | t">
      <div class="hero-carousel" aria-hidden="true">
        @for (src of slides; track src; let i = $index) {
          <img
            class="hero-slide"
            [class.is-active]="i === activeIndex()"
            [src]="src"
            alt=""
            decoding="async"
            [attr.fetchpriority]="i === 0 ? 'high' : 'low'"
          />
        }
        <div class="hero-carousel-vignette"></div>
      </div>

      <div class="hero-overlay" aria-hidden="true"></div>

      <div class="hero-layout">
        <div class="hero-card">
          <p class="kicker">
            <span class="kicker-chunk">{{ 'home.kickerPlace' | t }} ·</span>
            <span class="kicker-chunk">{{ 'home.kickerRegion' | t }}</span>
          </p>
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
          <p class="tagline">{{ 'home.tagline' | t }}</p>
          <div class="hero-actions">
            <a class="btn-primary" routerLink="/carta">{{ 'home.ctaMenu' | t }}</a>
            <a class="btn-outline" routerLink="/contacto">{{ 'home.ctaContact' | t }}</a>
          </div>
        </div>

        <div
          class="carousel-ui"
          role="group"
          [attr.aria-label]="'home.carouselLabel' | t"
        >
          <button
            type="button"
            class="carousel-arrow carousel-arrow--prev"
            (click)="prevSlide()"
            [attr.aria-label]="'home.carouselPrev' | t"
          >‹</button>
          <div class="carousel-dots">
            @for (src of slides; track src; let i = $index) {
              <button
                type="button"
                class="carousel-dot"
                [class.is-active]="i === activeIndex()"
                (click)="goToSlide(i)"
                [attr.aria-label]="('home.carouselGoTo' | t) + ' ' + (i + 1)"
                [attr.aria-current]="i === activeIndex() ? 'true' : null"
              ></button>
            }
          </div>
          <button
            type="button"
            class="carousel-arrow carousel-arrow--next"
            (click)="nextSlide()"
            [attr.aria-label]="'home.carouselNext' | t"
          >›</button>
        </div>
      </div>

      <p class="photo-credit">{{ 'home.photoCaption' | t }}</p>
    </section>

    <section class="home-strip" aria-label="Información rápida">
      <div class="home-strip-inner">
        <article class="strip-card">
          <span class="strip-icon" aria-hidden="true">🍽</span>
          <h2 class="strip-title">{{ 'home.stripMenuTitle' | t }}</h2>
          <p class="strip-text">{{ 'home.stripMenuText' | t }}</p>
          <a class="strip-link" routerLink="/carta">{{ 'home.ctaMenu' | t }} →</a>
        </article>
        <article class="strip-card">
          <span class="strip-icon" aria-hidden="true">📍</span>
          <h2 class="strip-title">{{ 'home.stripLocationTitle' | t }}</h2>
          <p class="strip-text">{{ 'home.stripLocationText' | t }}</p>
          <a class="strip-link" routerLink="/contacto">{{ 'home.ctaContact' | t }} →</a>
        </article>
        <article class="strip-card strip-card--accent">
          <span class="strip-icon" aria-hidden="true">⚓</span>
          <h2 class="strip-title">{{ 'home.stripSeaTitle' | t }}</h2>
          <p class="strip-text">{{ 'home.stripSeaText' | t }}</p>
        </article>
      </div>
    </section>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  readonly slides = HOME_CAROUSEL_IMAGES;
  readonly activeIndex = signal(0);

  private timer: ReturnType<typeof setInterval> | null = null;
  private reducedMotion = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    if (!this.reducedMotion && this.slides.length > 1) {
      this.timer = setInterval(() => this.nextSlide(), HOME_CAROUSEL_INTERVAL_MS);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  nextSlide(): void {
    const n = this.slides.length;
    if (n < 2) return;
    this.activeIndex.update(i => (i + 1) % n);
    this.restartAutoplay();
  }

  prevSlide(): void {
    const n = this.slides.length;
    if (n < 2) return;
    this.activeIndex.update(i => (i - 1 + n) % n);
    this.restartAutoplay();
  }

  goToSlide(index: number): void {
    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  private restartAutoplay(): void {
    if (this.reducedMotion || this.slides.length < 2) return;
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.nextSlide(), HOME_CAROUSEL_INTERVAL_MS);
  }
}