import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { createElement } from 'lucide';
import { getSectionLucideIcon } from '../../data/section-lucide-icons';
import { resolveSectionIconId } from '../../utils/section-icon.util';

@Component({
  selector: 'app-section-icon',
  standalone: true,
  template: `<span class="section-icon-host" #host></span>`,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      line-height: 0;
    }

    .section-icon-host {
      width: 1.15em;
      height: 1.15em;
      color: var(--section-icon-color, var(--navy, #3d2918));
    }

  .section-icon-host :global(svg) {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
})
export class SectionIconComponent implements OnChanges, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;

  @Input({ required: true }) icon!: string;

  ngAfterViewInit(): void {
    this.paintIcon();
  }

  ngOnChanges(): void {
    this.paintIcon();
  }

  private paintIcon(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const wrap = this.host?.nativeElement;
    if (!wrap) return;

    wrap.replaceChildren();

    const iconNode = getSectionLucideIcon(resolveSectionIconId(this.icon));
    const svg = createElement(iconNode, {
      width: '100%',
      height: '100%',
      'stroke-width': 1.85,
      'aria-hidden': 'true',
      focusable: 'false',
    });
    wrap.appendChild(svg);
  }
}
