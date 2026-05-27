import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MENU_SECTIONS } from '../../data/menu.data';
import { MenuItem, MenuSection } from '../../models/menu.model';
import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { AllergenIconComponent } from '../../components/allergen-icon/allergen-icon.component';
import { SectionIconComponent } from '../../components/section-icon/section-icon.component';

export type OrderPriceFormat = 'tapa' | 'media' | 'racion' | 'single';

export interface OrderCartLine {
  key: string;
  sectionId: string;
  itemIndex: number;
  format: OrderPriceFormat;
  title: string;
  subtitle?: string;
  unit: number;
  unitDisplay: string;
  qty: number;
}

function parseEuroLabel(s: string | undefined): number {
  if (!s) return 0;
  const t = s.trim();
  if (t === '—' || t === '-' || t === '–') return 0;
  const cleaned = t
    .replace(/€/g, '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function lineKey(sectionId: string, itemIndex: number, format: OrderPriceFormat): string {
  return `${sectionId}:${itemIndex}:${format}`;
}

@Component({
  selector: 'app-pedidos-local-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, AllergenIconComponent, SectionIconComponent],
  templateUrl: './pedidos-local-page.component.html',
  styleUrls: ['./pedidos-local-page.component.scss'],
})
export class PedidosLocalPageComponent {
  private readonly i18n = inject(I18nService);

  readonly sections = MENU_SECTIONS;
  readonly activeSectionId = signal<string | 'todas'>('todas');
  readonly cartOpen = signal(false);
  readonly sheet = signal<{ section: MenuSection; index: number } | null>(null);
  readonly selectedFormat = signal<OrderPriceFormat>('racion');
  readonly toast = signal<string | null>(null);

  readonly cart = signal<OrderCartLine[]>([]);

  readonly cartCount = computed(() =>
    this.cart().reduce((n, l) => n + l.qty, 0),
  );

  readonly cartTotal = computed(() =>
    this.cart().reduce((n, l) => n + l.unit * l.qty, 0),
  );

  readonly filteredSections = computed(() => {
    this.i18n.lang();
    const id = this.activeSectionId();
    if (id === 'todas') return this.sections;
    return this.sections.filter(s => s.id === id);
  });

  formatMoney(n: number): string {
    return new Intl.NumberFormat(this.i18n.lang(), {
      style: 'currency',
      currency: 'EUR',
    }).format(n);
  }

  secTitle(s: MenuSection): string {
    return this.i18n.catalog(`catalog.sections.${s.id}`, s.title);
  }

  itemName(s: MenuSection, i: number, fallback: string): string {
    return this.i18n.catalog(`catalog.items.${s.id}.${i}.name`, fallback);
  }

  itemDesc(s: MenuSection, i: number, fallback: string | undefined): string {
    if (!fallback) return '';
    return this.i18n.catalog(`catalog.items.${s.id}.${i}.description`, fallback);
  }

  fromPrice(section: MenuSection, it: MenuItem, _i: number): string {
    if (it.triplePrice) {
      const prices = section.halfRacionOnly
        ? [it.triplePrice.media, it.triplePrice.racion]
        : [it.triplePrice.tapa, it.triplePrice.media, it.triplePrice.racion];
      const positives = prices
        .map(p => parseEuroLabel(p))
        .filter(x => x > 0);
      if (!positives.length) {
        return this.i18n.t('order.fromPriceAsk');
      }
      const m = Math.min(...positives);
      return this.i18n.t('order.fromPrice').replace('{{p}}', this.formatMoney(m));
    }
    const u = parseEuroLabel(it.price);
    if (u <= 0) return this.i18n.t('order.fromPriceAsk');
    return this.formatMoney(u);
  }

  openSizeSheet(section: MenuSection, index: number, it: MenuItem): void {
    if (!it.triplePrice) return;
    this.selectedFormat.set(section.halfRacionOnly ? 'media' : 'racion');
    this.sheet.set({ section, index });
  }

  closeSheet(): void {
    this.sheet.set(null);
  }

  confirmSheetAdd(): void {
    const sh = this.sheet();
    if (!sh) return;
    const it = sh.section.items[sh.index];
    if (!it?.triplePrice) return;
    const fmt = this.selectedFormat();
    const display =
      fmt === 'tapa'
        ? (it.triplePrice.tapa ?? '—')
        : fmt === 'media'
          ? it.triplePrice.media
          : it.triplePrice.racion;
    const unit = parseEuroLabel(display);
    this.pushLine({
      key: lineKey(sh.section.id, sh.index, fmt),
      sectionId: sh.section.id,
      itemIndex: sh.index,
      format: fmt,
      title: this.itemName(sh.section, sh.index, it.name),
      subtitle: this.formatLabel(fmt),
      unit,
      unitDisplay: display,
      qty: 1,
    });
    this.closeSheet();
    this.flashToast(this.i18n.t('order.added'));
  }

  quickAddSingle(section: MenuSection, index: number, it: MenuItem): void {
    if (it.triplePrice) {
      this.openSizeSheet(section, index, it);
      return;
    }
    const unit = parseEuroLabel(it.price);
    const display = it.price || '—';
    this.pushLine({
      key: lineKey(section.id, index, 'single'),
      sectionId: section.id,
      itemIndex: index,
      format: 'single',
      title: this.itemName(section, index, it.name),
      unit,
      unitDisplay: display,
      qty: 1,
    });
    this.flashToast(this.i18n.t('order.added'));
  }

  private formatLabel(fmt: OrderPriceFormat): string {
    if (fmt === 'tapa') return this.i18n.t('order.fmtTapa');
    if (fmt === 'media') return this.i18n.t('order.fmtMedia');
    if (fmt === 'racion') return this.i18n.t('order.fmtRacion');
    return '';
  }

  private pushLine(line: OrderCartLine): void {
    this.cart.update(lines => {
      const i = lines.findIndex(l => l.key === line.key);
      if (i >= 0) {
        const next = [...lines];
        next[i] = { ...next[i], qty: next[i].qty + line.qty };
        return next;
      }
      return [...lines, line];
    });
  }

  inc(key: string): void {
    this.cart.update(lines =>
      lines.map(l => (l.key === key ? { ...l, qty: l.qty + 1 } : l)),
    );
  }

  dec(key: string): void {
    this.cart.update(lines => {
      const next = lines
        .map(l => (l.key === key ? { ...l, qty: l.qty - 1 } : l))
        .filter(l => l.qty > 0);
      return next;
    });
  }

  remove(key: string): void {
    this.cart.update(lines => lines.filter(l => l.key !== key));
  }

  clearCart(): void {
    this.cart.set([]);
    this.cartOpen.set(false);
  }

  toggleCart(): void {
    this.cartOpen.update(v => !v);
  }

  checkoutDemo(): void {
    window.alert(this.i18n.t('order.checkoutMsg'));
  }

  private flashToast(msg: string): void {
    this.toast.set(msg);
    window.setTimeout(() => this.toast.set(null), 1600);
  }
}
