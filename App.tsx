
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import MenuItemCard from './components/MenuItemCard';
import CartDrawer from './components/CartDrawer';
import AIChat from './components/AIChat';
import BottomNav from './components/BottomNav';
import AdminPanel from './components/AdminPanel';
import SidebarNav from './components/SidebarNav';
import { menuService } from './services/menuService';
import { MenuItem, CartItem, CategoryType } from './types';

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Back-end state
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = menuService.subscribeToMenu(
      (items) => {
        setMenuItems(items);
        setFirebaseError(null);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.error("Firebase Connection Error:", error);
        if (error.code === 'permission-denied') {
          setFirebaseError("Acesso Negado: As regras de segurança do Firebase estão bloqueando a leitura.");
        } else {
          setFirebaseError("Falha na conexão com o banco de dados. Verifique sua internet ou credenciais.");
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const categoriesToRender = useMemo(() => {
    if (activeCategory !== 'Todos') return [activeCategory as CategoryType];
    return Object.values(CategoryType);
  }, [activeCategory]);

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    setShowNotification(`${item.name} adicionado!`);
    setTimeout(() => setShowNotification(null), 2000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleSaveItem = async (item: MenuItem) => {
    try {
      setIsSyncing(true);
      setShowNotification("Sincronizando...");
      await menuService.upsertItem(item);
      setIsEditing(false);
      setCurrentEditItem(null);
      setShowNotification("Cardápio atualizado!");
    } catch (error) {
      console.error(error);
      setShowNotification("Erro ao salvar dados.");
    } finally {
      setIsSyncing(false);
      setTimeout(() => setShowNotification(null), 2500);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if(window.confirm("Deseja excluir permanentemente?")) {
      try {
        setIsSyncing(true);
        await menuService.deleteItem(id);
        setIsEditing(false);
        setCurrentEditItem(null);
        setShowNotification("Item removido!");
      } catch (error) {
        setShowNotification("Erro ao remover item.");
      } finally {
        setIsSyncing(false);
        setTimeout(() => setShowNotification(null), 2000);
      }
    }
  };

  const openEdit = (item: MenuItem) => {
    setCurrentEditItem(item);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col md:flex-row">
      <SidebarNav 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <div className="flex-1 flex flex-col pb-24 md:pb-6 overflow-x-hidden">
        <Header 
          onSearch={setSearchQuery} 
          cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          isAdmin={isAdmin}
          onToggleAdmin={() => setIsAdmin(!isAdmin)}
        />
        
        {firebaseError && (
          <div className="m-4 p-5 bg-red-50 border-2 border-red-200 text-red-800 rounded-3xl shadow-sm animate-fade-in flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
              <i className="fa-solid fa-shield-halved text-2xl"></i>
            </div>
            <div className="text-center md:text-left">
              <p className="font-bold text-sm mb-1">{firebaseError}</p>
              <p className="text-xs opacity-80 leading-relaxed">
                Para corrigir, você precisa alterar as <strong>Rules</strong> no Console do Firebase para permitir acesso público de leitura e escrita. Veja as instruções no arquivo <code>services/firebaseConfig.ts</code>.
              </p>
            </div>
          </div>
        )}

        <main className="max-w-5xl mx-auto pt-4 w-full flex-1">
          <div className="px-4 mb-8">
            <div className={`rounded-[2rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl border-b-8 transition-all duration-700 ${
              isAdmin ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 border-yellow-400' : 'bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 border-yellow-400'
            }`}>
               <div className="relative z-10">
                  <div className={`flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-lg inline-block mb-4 uppercase tracking-[0.2em] shadow-sm ${
                    isAdmin ? 'bg-white text-indigo-600' : 'bg-yellow-400 text-indigo-900'
                  }`}>
                    {isSyncing && <i className="fa-solid fa-cloud-arrow-up animate-pulse"></i>}
                    {isAdmin ? 'Controle Cloud' : 'Bella Vista Premium'}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                    {isAdmin ? 'Menu em Tempo Real' : 'Sabores Inesquecíveis'}
                  </h2>
                  <p className="text-indigo-100 text-xs md:text-base max-w-md opacity-80 leading-relaxed font-light">
                    {isAdmin 
                      ? 'Todas as alterações são publicadas instantaneamente no Firebase.' 
                      : 'O melhor do Nordeste na AABB Aracaju. Do mar à brasa, sabores únicos.'}
                  </p>
                  
                  {isAdmin && (
                    <button 
                      onClick={() => { setCurrentEditItem(null); setIsEditing(true); }}
                      className="mt-8 bg-white text-indigo-900 px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl"
                    >
                      <i className="fa-solid fa-plus mr-2"></i> Adicionar Item
                    </button>
                  )}
               </div>
               <i className={`fa-solid absolute -bottom-10 -right-10 text-[240px] opacity-10 rotate-12 transition-all duration-1000 ${
                 isAdmin ? 'fa-database scale-110' : 'fa-umbrella-beach'
               }`}></i>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-indigo-300">
               <i className="fa-solid fa-circle-notch fa-spin text-4xl mb-4"></i>
               <p className="font-bold text-xs uppercase tracking-widest">Carregando Cardápio...</p>
            </div>
          ) : (
            <div className="px-4 space-y-16 mb-20">
              {menuItems.length === 0 && !firebaseError && (
                <div className="text-center py-20 bg-white/50 rounded-[2rem] border-2 border-dashed border-gray-200">
                   <i className="fa-solid fa-utensils text-5xl text-gray-200 mb-4"></i>
                   <p className="text-gray-400 font-medium">O cardápio está vazio.</p>
                   <p className="text-xs text-gray-400 mt-2">Ative o modo Admin no ícone 'B' para adicionar pratos.</p>
                </div>
              )}
              {categoriesToRender.map(category => {
                const items = menuItems.filter(item => 
                  item.category === category &&
                  (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   item.description.toLowerCase().includes(searchQuery.toLowerCase()))
                );

                if (items.length === 0) return null;

                return (
                  <section key={category} id={category.replace(/\s/g, '-')} className="animate-fade-in scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
                      <h3 className="text-indigo-900 font-serif font-bold text-3xl">
                        {category}
                      </h3>
                      <div className="h-[1px] bg-indigo-100 flex-1 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                      {items.map(item => (
                        <MenuItemCard 
                          key={item.id} 
                          item={item} 
                          onAdd={addToCart}
                          isAdmin={isAdmin}
                          onEdit={openEdit}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {isEditing && (
        <AdminPanel 
          editingItem={currentEditItem}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
          onCancel={() => { setIsEditing(false); setCurrentEditItem(null); }}
        />
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={updateQuantity}
      />

      <BottomNav 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <AIChat menuItems={menuItems} />

      {showNotification && (
        <div className="fixed top-24 left-1/2 md:left-2/3 -translate-x-1/2 z-[100] bg-indigo-950 text-white px-6 py-3 rounded-2xl shadow-2xl animate-fade-up font-bold text-xs border border-white/10 uppercase tracking-wider flex items-center gap-3">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          {showNotification}
        </div>
      )}

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-up { animation: fade-up 0.3s ease-out forwards; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
