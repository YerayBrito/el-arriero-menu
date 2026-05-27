/**
 * Iconos de categoría desde Lucide (https://lucide.dev) — licencia ISC, uso comercial libre.
 */
import type { IconNode } from 'lucide';
import {
  Barrel,
  Beef,
  Beer,
  BottleWine,
  CakeSlice,
  Cherry,
  Citrus,
  Coffee,
  CupSoda,
  Fish,
  FlaskRound,
  GlassWater,
  Grape,
  Phone,
  Salad,
  Sandwich,
  Soup,
  Star,
  Umbrella,
  Utensils,
  UtensilsCrossed,
  Wine,
} from 'lucide';
import { SectionIconId } from '../utils/section-icon.util';

export const SECTION_LUCIDE_ICONS: Record<SectionIconId, IconNode> = {
  entrantes: UtensilsCrossed,
  ensaladas: Salad,
  salsas: Soup,
  pescados: Fish,
  carnes: Beef,
  bocadillos: Sandwich,
  postres: CakeSlice,
  domingos: Star,
  encargo: Phone,
  refrescos: CupSoda,
  zumos: Citrus,
  cafe: Coffee,
  /* Bebidas: botella / copa / barrica — sin símbolos abstractos */
  licores: FlaskRound,
  chupitos: GlassWater,
  cocteles: Umbrella,
  cervezas: Beer,
  vodka: BottleWine,
  aperitivos: Cherry,
  vinos: Grape,
  rones: Barrel,
  brandy: Wine,
  ginebra: BottleWine,
  whisky: Wine,
  default: Utensils,
};

export function getSectionLucideIcon(id: SectionIconId): IconNode {
  return SECTION_LUCIDE_ICONS[id] ?? SECTION_LUCIDE_ICONS.default;
}
