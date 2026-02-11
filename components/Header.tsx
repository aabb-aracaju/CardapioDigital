
import React from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, cartCount, onOpenCart, isAdmin, onToggleAdmin }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleAdmin}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl font-serif border shadow-sm transition-all ${
              isAdmin ? 'bg-yellow-400 border-yellow-500 text-indigo-900' : 'bg-indigo-900 border-indigo-800 text-yellow-400'
            }`}
          >
            {isAdmin ? <i className="fa-solid fa-user-gear text-sm"></i> : 'B'}
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-serif font-bold text-indigo-900 leading-tight">
              {isAdmin ? 'Gestão Bella Vista' : 'Bar Bella Vista'}
            </h1>
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
              {isAdmin ? 'Painel Administrativo' : 'AABB Aracaju'}
            </span>
          </div>
        </div>

        <div className="flex-1 mx-4 max-w-xs relative hidden sm:block">
          <input 
            type="text" 
            placeholder="Pesquisar..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-yellow-400 text-sm transition-all"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenCart}
            className="relative p-2.5 bg-gray-100 text-indigo-900 rounded-full hover:bg-yellow-400 transition-colors"
          >
            <i className="fa-solid fa-basket-shopping text-sm"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <input 
            type="text" 
            placeholder="O que procura?"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-yellow-400 text-sm"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
