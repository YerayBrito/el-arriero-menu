export type AllergenCode =
  | 'gluten'
  | 'crustaceos'
  | 'huevo'
  | 'pescado'
  | 'lacteos'
  | 'frutosSecos'
  | 'mostaza'
  | 'moluscos'
  | 'soja'
  | 'apio'
  | 'sesamo'
  | 'altramuces'
  | 'sulfitos'
  | 'cacahuetes';

export interface TriplePrice {
  tapa: string;
  media: string;
  racion: string;
}

export interface MenuItem {
  name: string;
  description?: string;
  /** Single price string e.g. "8,50€" */
  price?: string;
  /** Three prices for entrantes */
  triplePrice?: TriplePrice;
  allergens?: AllergenCode[];
  highlight?: boolean;       // renders with gold background (combo, specials)
  note?: string;             // small italic note below description
}

export interface MenuSection {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;         // e.g. "Pequeña · ½ Ración · Ración"
  items: MenuItem[];
  hasTriplePricing?: boolean;
  pillItems?: string[];      // for salsas row
}
