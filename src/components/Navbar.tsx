import React from 'react';
import { Search, ShoppingBag, Leaf, Clock } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#1b3b2b] text-[#f8f6f0] shadow-md border-b border-[#c85a32]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Lado Izquierdo: Logo / Marca */}
        <div className="flex-1 flex items-center justify-start gap-3 min-w-0">
          <div className="bg-[#c85a32] p-2.5 rounded-2xl shadow-inner flex items-center justify-center flex-shrink-0">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block truncate">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-none text-[#f8f6f0]">
              Pachamama Colorada
            </h1>
            <span className="text-[11px] text-[#e28763] font-semibold tracking-wider uppercase block mt-1">
              Dietética & Alimentos Naturales
            </span>
          </div>
          <div className="sm:hidden">
            <h1 className="text-base font-black text-[#f8f6f0] leading-none">
              Pachamama
            </h1>
          </div>
        </div>

        {/* Centro: Buscador */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-300/70 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar frutos secos, semillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-emerald-100/60 pl-10 pr-4 py-2.5 rounded-xl text-sm border border-emerald-500/20 focus:outline-none focus:bg-white/20 focus:border-[#c85a32] transition duration-200"
            />
          </div>
        </div>

        {/* Lado Derecho: Horarios Prolijos + Carrito */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
          
          {/* Badge Informativo de Horarios (Limpio y en 2 líneas exactas) */}
          <div className="hidden xl:flex items-center gap-3 bg-white/5 border border-white/10 py-2 px-3.5 rounded-xl whitespace-nowrap">
            <Clock className="w-4 h-4 text-[#e28763] flex-shrink-0" />
            
            <div className="text-[11px] leading-snug space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">Lun a Vie:</span>
                <span className="text-emerald-100/80">8 a 12:30 / 15:30 a 20 hs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">Sábados:</span>
                <span className="text-emerald-100/80">9 a 12:30 hs</span>
              </div>
            </div>

            <div className="w-px h-6 bg-emerald-500/30 mx-0.5" />

            <div className="flex items-center gap-1.5 text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-emerald-300 text-xs">Abierto</span>
            </div>
          </div>

          {/* Botón de Carrito */}
          <button
            onClick={onOpenCart}
            className="relative bg-[#c85a32] hover:bg-[#b34e2a] active:scale-95 text-white p-3 rounded-2xl transition shadow-md flex items-center justify-center cursor-pointer flex-shrink-0"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#1b3b2b] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};