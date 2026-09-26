import { AppLang } from '../i18n/i18n.service';

interface LocalizedText {
  es: string;
  en: string;
  de: string;
}

interface LocalizedList {
  es: string[];
  en: string[];
  de: string[];
}

export interface ChristmasMenu {
  id: string;
  nombre: LocalizedText;
  entrantes: LocalizedList;
  extra: LocalizedText;
  principales: LocalizedList;
  priceBase: number;
  priceAmp: number;
}

export const CHRISTMAS_MENUS: ChristmasMenu[] = [
  {
    id: 'marisco',
    nombre: { es: 'Menú Marisco', en: 'Seafood Menu', de: 'Meeresfrüchte-Menü' },
    entrantes: {
      es: ['Gambas al ajillo', 'Mejillones al vapor', 'Pulpo a la gallega'],
      en: ['Prawns in garlic oil', 'Steamed mussels', 'Galician-style octopus'],
      de: ['Garnelen in Knoblauchöl', 'Gedämpfte Muscheln', 'Oktopus nach galicischer Art'],
    },
    extra: { es: 'Puntitas de calamar', en: 'Crispy squid strips', de: 'Knusprige Tintenfischstreifen' },
    principales: {
      es: ['Calamares fritos', 'Paella de marisco', 'Sancocho'],
      en: ['Fried calamari rings', 'Seafood paella', 'Canarian sancocho'],
      de: ['Frittierte Calamari-Ringe', 'Meeresfrüchte-Paella', 'Kanarischer Sancocho'],
    },
    priceBase: 44,
    priceAmp: 47,
  },
  {
    id: 'tradicion',
    nombre: { es: 'Menú Tradición', en: 'Tradition Menu', de: 'Traditions-Menü' },
    entrantes: {
      es: ['Papas arrugadas', 'Queso frito con mermelada de arándanos', 'Croquetas de pescado'],
      en: ['Wrinkly potatoes', 'Pan-fried cheese with blueberry compote', 'Fish croquettes'],
      de: ['Runzelige Salzkartoffeln', 'Gebratener Käse mit Heidelbeer-Konfitüre', 'Fischkroketten'],
    },
    extra: { es: 'Pimientos de padrón', en: 'Padrón peppers', de: 'Padrón-Paprika' },
    principales: {
      es: ['Chipirones a la plancha o fritos', 'Pulpo frito con mojo verde', 'Tacos de pescado con mojo verde'],
      en: ['Baby squid grilled or fried', 'Fried octopus with green mojo', 'Fish tacos with green mojo'],
      de: ['Baby-Tintenfische vom Grill oder frittiert', 'Frittierter Oktopus mit grünem Mojo', 'Fisch-Tacos mit grünem Mojo'],
    },
    priceBase: 37,
    priceAmp: 39,
  },
  {
    id: 'pescador',
    nombre: { es: 'Menú Pescador', en: "Fisherman's Menu", de: 'Fischer-Menü' },
    entrantes: {
      es: ['Pulpo a la gallega', 'Queso canario', 'Gambas al ajillo'],
      en: ['Galician-style octopus', 'Canarian cheese', 'Prawns in garlic oil'],
      de: ['Oktopus nach galicischer Art', 'Kanarischer Käse', 'Garnelen in Knoblauchöl'],
    },
    extra: { es: 'Mejillones al vapor', en: 'Steamed mussels', de: 'Gedämpfte Muscheln' },
    principales: {
      es: ['Calamares fritos', 'Pescado fresco frito', 'Filete de pez espada a la plancha'],
      en: ['Fried calamari rings', 'Fried fresh fish', 'Grilled swordfish fillet'],
      de: ['Frittierte Calamari-Ringe', 'Frischer Fisch, gebraten', 'Schwertfisch-Filet vom Grill'],
    },
    priceBase: 43,
    priceAmp: 47,
  },
];

export function localizedText(t: LocalizedText, lang: AppLang): string {
  return t[lang] ?? t.es;
}

export function localizedList(l: LocalizedList, lang: AppLang): string[] {
  return l[lang] ?? l.es;
}
