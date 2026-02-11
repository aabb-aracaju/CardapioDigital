
import React, { useState } from 'react';
import { CategoryType } from '../types';

interface BottomNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { label: 'Início', icon: 'fa-house', type: 'Todos' },
  { label: 'Carnes', icon: 'fa-drumstick-bite', type: CategoryType.Carnes },
  { label: 'Peixes', icon: 'fa-fish', type: CategoryType.Peixes },
  { label: 'Petiscos', icon: 'fa-cheese', type: CategoryType.Petiscos },
  { label: 'Caldos', icon: 'fa-bowl-food', type: CategoryType.Caldinhos },
  { label: 'Pastéis', icon: 'fa-shrimp', type: CategoryType.Pasteis },
  { label: 'Bebidas', icon: 'fa-beer-mug-empty', type: CategoryType.Bebidas },
  { label: 'Drinks', icon: 'fa-martini-glass-citrus', type: CategoryType.Drinks },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeCategory, onSelectCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelect = (type: string) => {
    onSelectCategory(type);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Menu Overlay em Grade para Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end">
          <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-full bg-white rounded-t-[40px] p-8 shadow-2xl animate-slide-up flex flex-col max-h-[85vh]">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8" />
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-indigo-900">Categorias</h3>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 p-2">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 overflow-y-auto no-scrollbar pb-10">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => handleSelect(cat.type)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-3xl transition-all ${
                    activeCategory === cat.type 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                      : 'bg-gray-50 text-gray-500 active:bg-indigo-50'
                  }`}
                >
                  <i className={`fa-solid ${cat.icon} text-xl`}></i>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Barra de Ações Simplificada */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="flex items-center justify-around h-20 px-6">
          <button
            onClick={() => onSelectCategory('Todos')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeCategory === 'Todos' && !isMenuOpen ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <i className="fa-solid fa-house text-xl"></i>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Início</span>
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-16 h-16 bg-indigo-900 text-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-indigo-200 -mt-10 border-4 border-white active:scale-90 transition-all"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-list-ul'} text-xl`}></i>
          </button>

          <button
            onClick={() => onSelectCategory(CategoryType.Bebidas)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeCategory === CategoryType.Bebidas ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <i className="fa-solid fa-beer-mug-empty text-xl"></i>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Bebidas</span>
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </>
  );
};

export default BottomNav;
