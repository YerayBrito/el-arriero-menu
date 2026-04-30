import { MenuSection } from '../models/menu.model';

// ═══════════════════════════════════════════════════════════════
//  CARTA EL ARRIERO — Datos del menú (editables)
//  Cada sección vive en un JSON independiente dentro de:
//  `src/app/data/menu/*.json`
// ═══════════════════════════════════════════════════════════════

import entrantesJson from './menu/entrantes.json';
import salsasJson from './menu/salsas.json';
import pescadosJson from './menu/pescados.json';
import carnesJson from './menu/carnes.json';
import postresJson from './menu/postres.json';
import domingosJson from './menu/domingos.json';
import encargoJson from './menu/encargo.json';

export const MENU_SECTIONS: MenuSection[] = [
  entrantesJson as MenuSection,
  salsasJson as MenuSection,
  pescadosJson as MenuSection,
  carnesJson as MenuSection,
  postresJson as MenuSection,
  domingosJson as MenuSection,
  encargoJson as MenuSection,
];
