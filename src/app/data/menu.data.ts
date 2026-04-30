import { MenuSection } from '../models/menu.model';

// ═══════════════════════════════════════════════════════════════
//  CARTA EL ARRIERO — PLAYA DE ARINAGA, AGÜIMES, GRAN CANARIA
//  Edita aquí los precios y platos. El diseño se actualiza solo.
// ═══════════════════════════════════════════════════════════════

export const MENU_SECTIONS: MenuSection[] = [

  // ── ENTRANTES ─────────────────────────────────────────────────
  {
    id: 'entrantes',
    icon: '🫙',
    title: 'Entrantes',
    hasTriplePricing: true,
    items: [
      {
        name: 'Papas arrugadas',
        description: 'Con mojo rojo o mojo verde',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
      },
      {
        name: 'Queso canario',
        description: 'Queso tierno y queso semiduro',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['lacteos'],
      },
      {
        name: 'Queso frito con mermelada de arándanos',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['gluten', 'huevo', 'lacteos'],
      },
      {
        name: 'Pimientos de padrón',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
      },
      {
        name: 'Ensalada mixta',
        description: 'Lechuga, tomate, cebolla, aceitunas, huevo',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['huevo'],
      },
      {
        name: 'Ensaladilla rusa',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['huevo', 'pescado', 'moluscos'],
      },
      {
        name: 'Gambas al ajillo',
        description: 'Aceite de oliva, ajo, guindilla',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['crustaceos'],
      },
      {
        name: 'Pulpo a la vinagreta',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['moluscos', 'mostaza'],
      },
      {
        name: 'Pulpo a la gallega',
        description: 'Pimentón, aceite de oliva, patata',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['moluscos'],
      },
      {
        name: 'Gofio escaldado',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['gluten'],
      },
      {
        name: 'Puntitas de calamar',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['gluten', 'moluscos'],
      },
      {
        name: 'Mejillones a la vinagreta',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['moluscos', 'mostaza'],
      },
      {
        name: 'Gambas a la gabardina',
        description: 'Rebozadas, crujientes',
        triplePrice: { tapa: '0,00€', media: '0,00€', racion: '0,00€' },
        allergens: ['gluten', 'huevo', 'crustaceos'],
      },
      {
        name: 'Pan',
        triplePrice: { tapa: '0,00€', media: '—', racion: '—' },
        allergens: ['gluten'],
      },
    ],
  },

  // ── SALSAS ────────────────────────────────────────────────────
  {
    id: 'salsas',
    icon: '🫙',
    title: 'Salsas',
    items: [],
    pillItems: ['Alioli', 'Mojo Rojo', 'Mojo Verde', 'Salsa de arándanos'],
  },

  // ── PESCADOS ──────────────────────────────────────────────────
  {
    id: 'pescados',
    icon: '🐟',
    title: 'Pescados del Atlántico',
    items: [
      {
        name: 'Pescado a la plancha',
        description: 'Según disponibilidad del día',
        price: '00,00€',
        allergens: ['pescado'],
      },
      {
        name: 'Pescado empanado',
        price: '00,00€',
        allergens: ['gluten', 'huevo', 'pescado'],
      },
      {
        name: 'Tacos de pescado',
        description: 'A la plancha, con guarnición',
        price: '00,00€',
        allergens: ['pescado'],
      },
      {
        name: 'Croquetas de pescado caseras',
        price: '00,00€',
        allergens: ['gluten', 'huevo', 'lacteos', 'pescado'],
      },
      {
        name: 'Chipirones fritos',
        price: '00,00€',
        allergens: ['gluten', 'moluscos'],
      },
      {
        name: 'Chipirones a la plancha',
        price: '00,00€',
        allergens: ['moluscos'],
      },
      {
        name: 'Calamares fritos',
        price: '00,00€',
        allergens: ['gluten', 'moluscos'],
      },
      {
        name: 'Calamares a la plancha',
        price: '00,00€',
        allergens: ['moluscos'],
      },
      {
        name: '★ Combo El Arriero',
        description: 'Tacos de pescado, choco, pulpo frito, papas arrugadas y ensalada de col',
        price: '00,00€',
        allergens: ['pescado', 'moluscos'],
        highlight: true,
      },
      {
        name: 'Chocos fritos',
        price: '00,00€',
        allergens: ['gluten', 'moluscos'],
      },
      {
        name: 'Morena frita',
        price: '00,00€',
        allergens: ['gluten', 'pescado'],
      },
      {
        name: 'Churros de pescado',
        price: '00,00€',
        allergens: ['gluten', 'huevo', 'pescado'],
      },
      {
        name: 'Pescado frito al peso',
        description: 'Precio por 100g',
        price: '00,00€',
        allergens: ['gluten', 'pescado'],
      },
      {
        name: 'Atún a la plancha',
        price: '00,00€',
        allergens: ['pescado'],
      },
    ],
  },

  // ── CARNES ────────────────────────────────────────────────────
  {
    id: 'carnes',
    icon: '🥩',
    title: 'Carnes',
    items: [
      {
        name: 'Vuelta de ternera a la plancha',
        description: 'Con guarnición de la casa',
        price: '00,00€',
        allergens: ['mostaza'],
      },
      {
        name: 'Pechuga de pollo a la plancha',
        price: '00,00€',
      },
      {
        name: 'Carne de cerdo frita',
        description: 'Con papas arrugadas y mojo',
        price: '00,00€',
      },
    ],
  },

  // ── POSTRES ───────────────────────────────────────────────────
  {
    id: 'postres',
    icon: '🍮',
    title: 'Postres Caseros',
    items: [
      {
        name: 'Mousse de chocolate',
        price: '00,00€',
        allergens: ['huevo', 'lacteos', 'frutosSecos'],
      },
      {
        name: 'Natillas',
        price: '00,00€',
        allergens: ['huevo', 'lacteos', 'gluten'],
      },
      {
        name: 'Arroz con leche',
        price: '00,00€',
        allergens: ['lacteos'],
      },
      {
        name: 'Porción de tarta',
        description: 'Preguntar disponibilidad',
        price: '00,00€',
        allergens: ['gluten', 'huevo', 'lacteos'],
      },
      {
        name: 'Polvito uruguayo',
        description: 'Galleta y dulce de leche',
        price: '00,00€',
        allergens: ['gluten', 'huevo', 'lacteos'],
      },
    ],
  },

  // ── ESPECIALES DOMINGOS ───────────────────────────────────────
  {
    id: 'domingos',
    icon: '🌟',
    title: 'Especiales Domingos',
    items: [
      {
        name: '🥘 Paella',
        description: 'De marisco o mixta · Solo domingos',
        price: '00,00€',
        allergens: ['crustaceos', 'moluscos', 'pescado'],
        highlight: true,
      },
      {
        name: '🍲 Sancocho canario',
        description: 'Cherne, papas, mojo y gofio · Solo domingos',
        price: '00,00€',
        allergens: ['pescado', 'gluten'],
        highlight: true,
      },
    ],
  },

  // ── POR ENCARGO ───────────────────────────────────────────────
  {
    id: 'encargo',
    icon: '📞',
    title: 'Por Encargo',
    items: [
      {
        name: 'Caldo de pescado',
        description: 'Bajo pedido previo, para llevar',
        price: '00,00€',
        allergens: ['pescado'],
        note: 'Consúltenos con antelación',
      },
      {
        name: 'Paella para llevar',
        description: 'Bajo pedido previo · para grupos',
        price: '00,00€',
        allergens: ['crustaceos', 'moluscos', 'pescado'],
        note: 'Consúltenos con antelación',
      },
    ],
  },
];
