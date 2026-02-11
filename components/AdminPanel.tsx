
import React, { useState, useRef, useEffect } from 'react';
import { MenuItem, CategoryType } from '../types';

interface AdminPanelProps {
  onSave: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  editingItem?: MenuItem | null;
  onCancel: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onSave, onDelete, editingItem, onCancel }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [formData, setFormData] = useState<Partial<MenuItem>>(
    editingItem || {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      category: CategoryType.Carnes,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      badges: []
    }
  );

  const [badgesInput, setBadgesInput] = useState(editingItem?.badges?.join(', ') || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Estados para o Crop
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [cropPosition, setCropPosition] = useState({ x: 50, y: 50, zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropSource(reader.result as string);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyCrop = () => {
    if (!cropSource || !canvasRef.current) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const img = new Image();
    img.src = cropSource;
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Definimos o tamanho final da imagem (Ex: 800x450 para 16:9 de boa qualidade)
      const targetWidth = 800;
      const targetHeight = 450;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Lógica de cálculo da área visível com base no zoom e posição (0-100)
      const zoom = cropPosition.zoom;
      const scale = Math.max(targetWidth / img.width, targetHeight / img.height) * zoom;
      
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      
      const offsetX = (targetWidth - drawWidth) * (cropPosition.x / 100);
      const offsetY = (targetHeight - drawHeight) * (cropPosition.y / 100);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      const resultBase64 = canvas.toDataURL('image/jpeg', 0.85);
      
      // Simulação de processamento
      let p = 0;
      const interval = setInterval(() => {
        p += 20;
        setUploadProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setFormData({ ...formData, image: resultBase64 });
          setIsUploading(false);
          setIsCropping(false);
          setCropSource(null);
        }
      }, 100);
    };
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = (clientX - dragStart.x) / 5; // Sensibilidade
    const deltaY = (clientY - dragStart.y) / 5;

    setCropPosition(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100, prev.x + deltaX)),
      y: Math.max(0, Math.min(100, prev.y + deltaY))
    }));
    setDragStart({ x: clientX, y: clientY });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.category) {
      const finalBadges = badgesInput.split(',').map(s => s.trim()).filter(s => s !== '');
      onSave({ ...formData, badges: finalBadges } as MenuItem);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal de Crop (Overlay Interno) */}
        {isCropping && (
          <div className="absolute inset-0 z-[70] bg-indigo-950 flex flex-col animate-fade-in">
            <div className="p-6 border-b border-white/10 flex justify-between items-center text-white">
              <h3 className="font-bold flex items-center gap-2">
                <i className="fa-solid fa-crop-simple"></i>
                Ajustar Imagem
              </h3>
              <button onClick={() => { setIsCropping(false); setCropSource(null); }} className="text-white/60 hover:text-white">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <div className="flex-1 relative bg-black/50 overflow-hidden flex items-center justify-center cursor-move"
                 onMouseDown={handleMouseDown}
                 onMouseMove={handleMouseMove}
                 onMouseUp={() => setIsDragging(false)}
                 onMouseLeave={() => setIsDragging(false)}
                 onTouchStart={handleMouseDown}
                 onTouchMove={handleMouseMove}
                 onTouchEnd={() => setIsDragging(false)}>
              
              {/* Moldura 16:9 */}
              <div className="absolute inset-0 z-10 pointer-events-none border-[40px] border-indigo-950/80">
                <div className="w-full h-full border-2 border-white/50 border-dashed rounded-lg shadow-[0_0_0_9999px_rgba(30,27,75,0.4)]"></div>
              </div>

              {cropSource && (
                <img 
                  src={cropSource} 
                  alt="Crop Target" 
                  className="max-w-none transition-transform duration-75 select-none"
                  style={{
                    transform: `translate(${(cropPosition.x - 50)}%, ${(cropPosition.y - 50)}%) scale(${cropPosition.zoom})`,
                    pointerEvents: 'none'
                  }}
                />
              )}

              {isUploading && (
                <div className="absolute inset-0 z-20 bg-indigo-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white">
                  <i className="fa-solid fa-circle-notch fa-spin text-4xl mb-4"></i>
                  <span className="font-bold uppercase tracking-widest text-xs">Finalizando Recorte...</span>
                  <div className="w-48 h-1 bg-white/20 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-yellow-400 transition-all" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white space-y-4">
              <div className="flex items-center gap-4">
                <i className="fa-solid fa-magnifying-glass-plus text-gray-400"></i>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1" 
                  value={cropPosition.zoom}
                  onChange={(e) => setCropPosition({ ...cropPosition, zoom: parseFloat(e.target.value) })}
                  className="flex-1 accent-indigo-600"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setIsCropping(false); setCropSource(null); }}
                  className="flex-1 py-3 border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={applyCrop}
                  className="flex-[2] py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  Concluir Recorte
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Arraste a imagem para posicionar</p>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="p-6 bg-indigo-900 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-pen-to-square"></i>
            {editingItem ? 'Editar Item' : 'Novo Item no Menu'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto no-scrollbar">
          {/* Upload de Imagem */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Foto do Prato (16:9)</label>
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`relative aspect-video w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all group ${
                isUploading 
                  ? 'border-indigo-400 bg-indigo-50/50 cursor-wait' 
                  : 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/30'
              }`}
            >
              {formData.image && !isUploading ? (
                <>
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-opacity group-hover:opacity-40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <i className="fa-solid fa-crop-simple text-indigo-600 text-xl"></i>
                    </div>
                    <span className="text-xs font-bold text-indigo-900 mt-2 bg-white/80 px-3 py-1 rounded-full">Alterar & Recortar</span>
                  </div>
                </>
              ) : !isUploading ? (
                <div className="flex flex-col items-center animate-pulse">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 border border-gray-100">
                    <i className="fa-solid fa-cloud-arrow-up text-2xl text-indigo-400"></i>
                  </div>
                  <span className="text-sm font-semibold text-gray-500">Clique para selecionar imagem</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Recorte automático para 16:9</span>
                </div>
              ) : null}
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nome do Prato</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Ex: Picanha na Brasa"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Preço (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                value={formData.price}
                onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Categoria</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as CategoryType})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                {Object.values(CategoryType).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Destaques (Separados por vírgula)</label>
            <input 
              type="text" 
              value={badgesInput}
              onChange={e => setBadgesInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Ex: Promoção, Novidade, Mais Pedido"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Descrição / Acompanhamentos</label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Descreva o que vem no prato..."
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit"
              disabled={isUploading}
              className={`w-full text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                editingItem 
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' 
                  : 'bg-indigo-900 hover:bg-black shadow-gray-200'
              }`}
            >
              {isUploading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Processando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk"></i>
                  {editingItem ? 'Salvar Alterações' : 'Cadastrar no Menu'}
                </>
              )}
            </button>
            
            {editingItem && !isUploading && (
              <button 
                type="button"
                onClick={() => onDelete(formData.id!)}
                className="w-full bg-red-50 text-red-600 py-3 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all text-xs uppercase tracking-widest"
              >
                Excluir Item do Cardápio
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
