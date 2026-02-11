
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-left">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <i className="fa-solid fa-calculator text-indigo-600"></i>
            Simulador de Valor
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-gray-400 text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <i className="fa-solid fa-clipboard-list text-5xl opacity-20"></i>
              <p className="text-center px-8">Adicione itens do cardápio para simular o valor total do seu consumo.</p>
              <button 
                onClick={onClose}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Explorar Cardápio
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                  <p className="text-indigo-600 font-medium text-xs">R$ {item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 bg-gray-50 hover:bg-gray-100 text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 py-0.5 font-bold text-xs">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 bg-gray-50 hover:bg-gray-100 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-900">R$ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-indigo-50 border-t border-indigo-100 space-y-4">
            <div className="flex justify-between items-center text-sm text-indigo-600">
              <span>Itens Selecionados</span>
              <span>{items.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span className="text-indigo-900">Total Estimado</span>
              <span className="text-indigo-700">R$ {total.toFixed(2)}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-indigo-100">
               <p className="text-[10px] text-indigo-400 text-center leading-tight">
                * Este é apenas um simulador de valores. Para realizar o pedido, por favor, solicite ao garçom na mesa.
               </p>
            </div>
            <button 
              onClick={onClose}
              className="w-full bg-indigo-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all"
            >
              Continuar Vendo Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
