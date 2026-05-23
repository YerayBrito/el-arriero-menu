import { MenuSection } from '../models/menu.model';

import coctelesJson from './drinks/cocteles.json';
import licoresJson from './drinks/licores.json';
import refrescosJson from './drinks/refrescos.json';
import cafeJson from './drinks/cafe.json';
import zumosJson from './drinks/zumos.json';
import cervezasJson from './drinks/cervezas.json';
import vodkaJson from './drinks/vodka.json';
import aperitivosJson from './drinks/aperitivos.json';
import ronesJson from './drinks/rones.json';
import brandyJson from './drinks/brandy.json';
import ginebraJson from './drinks/ginebra.json';
import whiskyJson from './drinks/whisky.json';
import chupitosJson from './drinks/chupitos.json';

export const DRINKS_SECTIONS: MenuSection[] = [
  coctelesJson as MenuSection,
  licoresJson as MenuSection,
  refrescosJson as MenuSection,
  cafeJson as MenuSection,
  zumosJson as MenuSection,
  cervezasJson as MenuSection,
  vodkaJson as MenuSection,
  aperitivosJson as MenuSection,
  ronesJson as MenuSection,
  brandyJson as MenuSection,
  ginebraJson as MenuSection,
  whiskyJson as MenuSection,
  chupitosJson as MenuSection,
];

export type CartaKind = 'comida' | 'bebidas';

export const CARTA_SHEET_IDS = {
  comida: {
    left: ['entrantes', 'salsas', 'carnes', 'postres'],
    right: ['pescados', 'domingos', 'encargo'],
  },
  bebidas: {
    left: ['refrescos', 'zumos', 'cafe', 'licores', 'chupitos', 'cocteles'],
    right: ['cervezas', 'vodka', 'aperitivos', 'rones', 'brandy', 'ginebra', 'whisky'],
  },
} as const;
