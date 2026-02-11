
import React from 'react';
import { CategoryType } from '../types';

interface SidebarNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const navItems = [
  { label: 'Todos os Pratos', icon: 'fa-layer-group', type: 'Todos' },
  { label: 'Carnes Nobres', icon: 'fa-drumstick-bite', type: CategoryType.Carnes },
  { label: 'Frutos do Mar', icon: 'fa-fish', type: CategoryType.Peixes },
  { label: 'Petiscos e Porções', icon: 'fa-cheese', type: CategoryType.Petiscos },
  { label: 'Caldinhos e Sopas', icon: 'fa-bowl-food', type: CategoryType.Caldinhos },
  { label: 'Pastéis Crocantes', icon: 'fa-shrimp', type: CategoryType.Pasteis },
  { label: 'Pratos Individuais', icon: 'fa-utensils', type: CategoryType.Individuais },
  { label: 'Pratos Kids', icon: 'fa-child', type: CategoryType.Infantil },
  { label: 'Bebidas Geladas', icon: 'fa-beer-mug-empty', type: CategoryType.Bebidas },
  { label: 'Drinks Especiais', icon: 'fa-martini-glass-citrus', type: CategoryType.Drinks },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-indigo-50 h-screen sticky top-0 overflow-y-auto no-scrollbar p-6">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center text-yellow-400 font-serif font-black text-2xl shadow-xl shadow-indigo-100 rotate-3">
          B
        </div>
        <div>
          <h2 className="font-serif font-bold text-indigo-900 text-xl leading-tight">Bella Vista</h2>
          <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-black">Menu Digital</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Navegação</p>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onSelectCategory(item.type)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 relative group ${
              activeCategory === item.type 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            {activeCategory === item.type && (
              <div className="absolute left-0 w-1.5 h-6 bg-yellow-400 rounded-r-full -ml-6" />
            )}
            <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all ${
              activeCategory === item.type 
                ? 'bg-white/20' 
                : 'bg-gray-100 group-hover:bg-white shadow-sm'
            }`}>
              <i className={`fa-solid ${item.icon} text-sm ${activeCategory === item.type ? 'text-white' : 'text-indigo-400'}`}></i>
            </div>
            <span className={`text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis ${activeCategory === item.type ? 'translate-x-1' : 'group-hover:translate-x-1'} transition-transform`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-indigo-50 px-2">
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-3xl p-5 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] text-yellow-400 uppercase font-black tracking-widest mb-1">Dica Especial</p>
            <p className="text-xs text-white font-medium leading-relaxed mb-3">
              Não saia sem provar nosso famoso <span className="text-yellow-400 font-bold">Camarão Alho e Óleo</span>!
            </p>
            <button 
              onClick={() => onSelectCategory(CategoryType.Petiscos)}
              className="text-[10px] text-white/60 font-bold uppercase hover:text-white transition-colors flex items-center gap-2"
            >
              Ver Petiscos <i className="fa-solid fa-arrow-right text-[8px]"></i>
            </button>
          </div>
          <i className="fa-solid fa-shrimp absolute -bottom-4 -right-4 text-6xl text-white/5 -rotate-12 transition-transform group-hover:scale-125 duration-700"></i>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
