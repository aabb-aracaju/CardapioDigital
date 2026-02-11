
import { MenuItem, CategoryType } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // --- REFEIÇÃO - CARNES ---
  {
    id: 'c1',
    name: 'Carne de sol, queijo derretido c/ pirão de leite',
    description: 'Para 2 pessoas. Acompanha Arroz, vinagrete e feijão tropeiro.',
    price: 100.00,
    category: CategoryType.Carnes,
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&q=80&w=400',
    badges: ['Destaque']
  },
  {
    id: 'c2',
    name: 'Churrasco de Filé com Fritas',
    description: 'Para 2 pessoas. Acompanha Arroz, vinagrete e feijão tropeiro.',
    price: 95.00,
    category: CategoryType.Carnes,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=400',
    badges: ['Novidade']
  },
  {
    id: 'c3',
    name: 'Filé à Parmegiana',
    description: 'Para 3 pessoas. Acompanha Arroz, Purê, Macarrão ou Batata Frita.',
    price: 120.00,
    category: CategoryType.Carnes,
    image: 'https://images.unsplash.com/photo-1632778149975-420e0e75ee0d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'c4',
    name: 'Picanha na Brasa',
    description: 'Para 2 pessoas. Arroz, vinagrete, feijão tropeiro, macaxeira ou batata frita.',
    price: 110.00,
    category: CategoryType.Carnes,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=400',
  },

  // --- REFEIÇÃO - PEIXES ---
  {
    id: 'f1',
    name: 'Moqueca de Peixe',
    description: 'Para 2 pessoas. Arroz, pirão, farofa e vinagrete.',
    price: 100.00,
    category: CategoryType.Peixes,
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&q=80&w=400',
    badges: ['Recomendado']
  },
  {
    id: 'f2',
    name: 'Moqueca de Camarão',
    description: 'Para 2 pessoas. Arroz, pirão, farofa e vinagrete.',
    price: 105.00,
    category: CategoryType.Peixes,
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'f3',
    name: 'Vermelha Inteira Frita',
    description: 'Para 3 pessoas. Feijão tropeiro, arroz e vinagrete.',
    price: 120.00,
    category: CategoryType.Peixes,
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=400',
  },

  // --- PETISCOS ---
  {
    id: 'p1',
    name: 'Carne do Sol com Fritas',
    description: 'Tradicional carne do sol acebolada com batatas.',
    price: 52.00,
    category: CategoryType.Petiscos,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400',
    badges: ['Promoção']
  },
  {
    id: 'p2',
    name: 'Filezinho com Fritas',
    description: 'Tiras de filé mignon suculentas com batatas.',
    price: 70.00,
    category: CategoryType.Petiscos,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p3',
    name: 'Tripinha Crocante',
    description: 'Porção de tripinha bem sequinha e crocante.',
    price: 45.00,
    category: CategoryType.Petiscos,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p4',
    name: 'Caranguejo (Unid)',
    description: 'Pedido mínimo 3 unidades. Famoso caranguejo da AABB.',
    price: 8.00,
    category: CategoryType.Petiscos,
    image: 'https://images.unsplash.com/photo-1590759223965-440ee367354b?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'p5',
    name: 'Camarão Alho e Óleo',
    description: 'Camarões selecionados preparados no alho e óleo.',
    price: 80.00,
    category: CategoryType.Petiscos,
    image: 'https://images.unsplash.com/photo-1559742811-824289511f48?auto=format&fit=crop&q=80&w=400',
  },

  // --- CALDINHOS ---
  {
    id: 'cd1',
    name: 'Caldinho de Camarão',
    description: 'Caldinho cremoso com temperos da casa.',
    price: 23.00,
    category: CategoryType.Caldinhos,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'cd2',
    name: 'Caldinho de Sururu',
    description: 'Tradicional caldinho de sururu de Aracaju.',
    price: 22.00,
    category: CategoryType.Caldinhos,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'cd3',
    name: 'Caldinho de Feijão',
    description: 'Delicioso caldinho de feijão batido.',
    price: 18.00,
    category: CategoryType.Caldinhos,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
  },

  // --- PASTÉIS ---
  {
    id: 'pt1',
    name: 'Pastel de Camarão',
    description: 'Unidade. Massa crocante e recheio generoso.',
    price: 12.00,
    category: CategoryType.Pasteis,
    image: 'https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'pt2',
    name: 'Pastel Misto',
    description: 'Unidade. Queijo e presunto.',
    price: 11.00,
    category: CategoryType.Pasteis,
    image: 'https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?auto=format&fit=crop&q=80&w=400',
  },

  // --- BEBIDAS (CERVEJAS 600ML) ---
  {
    id: 'b1',
    name: 'Heineken 600ml',
    description: 'Cerveja Premium 600ml.',
    price: 18.00,
    category: CategoryType.Bebidas,
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=400',
    badges: ['Gelada']
  },
  {
    id: 'b2',
    name: 'Stella Artois 600ml',
    description: 'Cerveja Premium 600ml.',
    price: 15.00,
    category: CategoryType.Bebidas,
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'b3',
    name: 'Spaten 600ml',
    description: 'Cerveja Puro Malte 600ml.',
    price: 15.00,
    category: CategoryType.Bebidas,
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'b4',
    name: 'Brahma Chopp 600ml',
    description: 'Tradicional 600ml.',
    price: 12.00,
    category: CategoryType.Bebidas,
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=400',
  },

  // --- SUCOS E OUTROS ---
  {
    id: 's1',
    name: 'Laranja - Jarra',
    description: 'Suco natural feito na hora.',
    price: 20.00,
    category: CategoryType.Bebidas,
    image: 'https://images.unsplash.com/photo-1600271886301-371036643929?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 's2',
    name: 'Refrigerante Lata',
    description: '350ml - Diversos sabores.',
    price: 7.00,
    category: CategoryType.Bebidas,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 's3',
    name: 'Água Coco - Jarra',
    description: 'Água de coco natural e gelada.',
    price: 15.00,
    category: CategoryType.Bebidas,
    image: 'https://images.unsplash.com/photo-1543508282-5c1f427f023f?auto=format&fit=crop&q=80&w=400',
  },

  // --- DRINKS E APERITIVOS ---
  {
    id: 'd1',
    name: 'Caipirinha',
    description: 'Drink clássico brasileiro.',
    price: 15.00,
    category: CategoryType.Drinks,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'd2',
    name: 'Frutarosca',
    description: 'Vodka com frutas selecionadas.',
    price: 18.00,
    category: CategoryType.Drinks,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400',
    badges: ['Popular']
  },
  {
    id: 'd3',
    name: 'Old Par 12 Anos',
    description: 'Dose de whisky premium.',
    price: 20.00,
    category: CategoryType.Drinks,
    image: 'https://images.unsplash.com/photo-1527281405159-0a0697294838?auto=format&fit=crop&q=80&w=400',
  }
];
