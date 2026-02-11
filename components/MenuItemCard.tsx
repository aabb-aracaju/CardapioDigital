
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  isAdmin?: boolean;
  onEdit?: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAdd, isAdmin, onEdit }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAction = () => {
    if (isAdmin && onEdit) {
      onEdit(item);
    } else {
      if (isAnimating) return;
      onAdd(item);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const getBadgeStyles = (badge: string) => {
    const b = badge.toLowerCase();
    if (b.includes('promo')) return 'bg-red-500 text-white border-red-400';
    if (b.includes('novid')) return 'bg-yellow-400 text-indigo-900 border-yellow-500';
    if (b.includes('destaque')) return 'bg-indigo-600 text-white border-indigo-500';
    return 'bg-indigo-900/80 backdrop-blur-md text-white border-white/20';
  };

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border flex flex-col hover:shadow-md transition-all group ${
      isAdmin ? 'border-yellow-200 ring-1 ring-yellow-50/50' : 'border-gray-50'
    }`}>
      <div className="relative h-44 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {isAdmin && (
            <span className="bg-yellow-400 text-indigo-900 text-[10px] px-2 py-1 rounded-full font-black shadow-sm border border-yellow-500 uppercase tracking-tighter mb-1">
              MODO EDITOR
            </span>
          )}
          {item.badges?.map((badge, idx) => (
            <span 
              key={idx} 
              className={`text-[10px] px-2.5 py-1 rounded-full font-bold shadow-md border uppercase tracking-tighter animate-fade-in ${getBadgeStyles(badge)}`}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors leading-tight">
            {item.name}
          </h3>
        </div>
        
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Valor</span>
            <span className="font-bold text-indigo-900">
              R$ {item.price.toFixed(2)}
            </span>
          </div>
          <button 
            onClick={handleAction}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 shadow-sm ${
              isAdmin 
                ? 'bg-yellow-400 text-indigo-900 hover:bg-indigo-900 hover:text-white'
                : isAnimating 
                  ? 'bg-green-500 text-white animate-pop' 
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            {isAdmin ? (
              <i className="fa-solid fa-pen-to-square"></i>
            ) : (
              <i className={`fa-solid ${isAnimating ? 'fa-check' : 'fa-plus'} transition-transform duration-200`}></i>
            )}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes button-pop-advanced {
          0% { transform: scale(1); }
          20% { transform: scale(0.6); }
          50% { transform: scale(1.6); box-shadow: 0 0 25px rgba(34, 197, 94, 0.6); }
          80% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-pop {
          animation: button-pop-advanced 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default MenuItemCard;
