export interface ChristmasMenu {
  id: string;
  nombre: string;
  entrantes: string[];
  extra: string;
  principales: string[];
  priceBase: number;
  priceAmp: number;
}

export const CHRISTMAS_MENUS: ChristmasMenu[] = [
  {
    id: 'marisco',
    nombre: 'Menú Marisco',
    entrantes: ['Gambas al ajillo', 'Mejillones al vapor', 'Pulpo a la gallega'],
    extra: 'Puntitas de calamar',
    principales: ['Calamares fritos', 'Paella de marisco', 'Sancocho'],
    priceBase: 44,
    priceAmp: 47,
  },
  {
    id: 'tradicion',
    nombre: 'Menú Tradición',
    entrantes: ['Papas arrugadas', 'Queso frito con mermelada de arándanos', 'Croquetas de pescado'],
    extra: 'Pimientos de padrón',
    principales: ['Chipirones a la plancha o fritos', 'Pulpo frito con mojo verde', 'Tacos de pescado con mojo verde'],
    priceBase: 37,
    priceAmp: 39,
  },
  {
    id: 'pescador',
    nombre: 'Menú Pescador',
    entrantes: ['Pulpo a la gallega', 'Queso canario', 'Gambas al ajillo'],
    extra: 'Mejillones al vapor',
    principales: ['Calamares fritos', 'Pescado fresco frito', 'Filete de pez espada a la plancha'],
    priceBase: 43,
    priceAmp: 47,
  },
];
