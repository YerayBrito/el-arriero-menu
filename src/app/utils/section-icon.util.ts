/** IDs de icono de categoría (coinciden con `MenuSection.id` en la mayoría de casos). */
export type SectionIconId =
  | 'entrantes'
  | 'ensaladas'
  | 'salsas'
  | 'pescados'
  | 'carnes'
  | 'bocadillos'
  | 'postres'
  | 'domingos'
  | 'encargo'
  | 'refrescos'
  | 'zumos'
  | 'cafe'
  | 'licores'
  | 'chupitos'
  | 'cocteles'
  | 'cervezas'
  | 'vodka'
  | 'aperitivos'
  | 'vinos'
  | 'rones'
  | 'brandy'
  | 'ginebra'
  | 'whisky'
  | 'default';

const KNOWN: ReadonlySet<string> = new Set<SectionIconId>([
  'entrantes', 'ensaladas', 'salsas', 'pescados', 'carnes', 'bocadillos', 'postres',
  'domingos', 'encargo', 'refrescos', 'zumos', 'cafe', 'licores', 'chupitos',
  'cocteles', 'cervezas', 'vodka', 'aperitivos', 'vinos', 'rones', 'brandy',
  'ginebra', 'whisky', 'default',
]);

/** Emojis legacy en JSON antiguos → id de sprite. */
const LEGACY_EMOJI: Record<string, SectionIconId> = {
  '🍽️': 'entrantes',
  '🍽': 'entrantes',
  '🥗': 'ensaladas',
  '🫙': 'salsas',
  '🐟': 'pescados',
  '🥩': 'carnes',
  '🥪': 'bocadillos',
  '🍮': 'postres',
  '🌟': 'domingos',
  '📞': 'encargo',
  '🥤': 'refrescos',
  '🍊': 'zumos',
  '☕': 'cafe',
  '🥃': 'licores',
  '🥂': 'chupitos',
  '🍹': 'cocteles',
  '🍺': 'cervezas',
  '🍸': 'vodka',
  '🍷': 'aperitivos',
};

export function resolveSectionIconId(icon: string | undefined | null): SectionIconId {
  const raw = (icon ?? '').trim();
  if (!raw) return 'default';
  if (KNOWN.has(raw)) return raw as SectionIconId;
  if (LEGACY_EMOJI[raw]) return LEGACY_EMOJI[raw];
  return 'default';
}

