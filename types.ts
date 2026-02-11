
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
  badges?: string[];
}

export enum CategoryType {
  Carnes = 'Carnes',
  Peixes = 'Peixes',
  Petiscos = 'Petiscos',
  Caldinhos = 'Caldinhos',
  Pasteis = 'Pastéis',
  Individuais = 'Pratos Individuais',
  Infantil = 'Infantil',
  Bebidas = 'Bebidas',
  Drinks = 'Drinks e Aperitivos'
}

export interface CartItem extends MenuItem {
  quantity: number;
}
