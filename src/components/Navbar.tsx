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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
        
        {/* Lado Izquierdo: Logo / Marca */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 sm:flex-initial">
          <div className="bg-[#c85a32] p-2 sm:p-2.5 rounded-2xl shadow-inner flex items-center justify-center flex-shrink-0">
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl md:text-2xl font-black tracking-tight leading-none text-[#f8f6f0] truncate">
              Pachamama Colorada
            </h1>
            <span className="text-[10px] sm:text-[11px] text-[#e28763] font-semibold tracking-wider uppercase block mt-0.5 sm:mt-1 truncate">
              Dietética & Alimentos
            </span>
          </div>
        </div>

        {/* Lado Derecho: Horarios + Carrito (En móvil se ubica arriba a la derecha) */}
        <div className="flex items-center justify-end gap-3 order-2 sm:order-3 sm:flex-1">
          
          {/* Badge Informativo de Horarios (Solo visible en pantallas XL) */}
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
            className="relative bg-[#c85a32] hover:bg-[#b34e2a] active:scale-95 text-white p-2.5 sm:p-3 rounded-2xl transition shadow-md flex items-center justify-center cursor-pointer flex-shrink-0"
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

        {/* Centro: Buscador (En móvil pasa a una 2da fila ocupando el 100% del ancho) */}
        <div className="w-full order-3 sm:order-2 sm:w-auto sm:flex-1 sm:max-w-md sm:mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-300/70 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar frutos secos, semillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-emerald-100/60 pl-10 pr-4 py-2 sm:py-2.5 rounded-xl text-sm border border-emerald-500/20 focus:outline-none focus:bg-white/20 focus:border-[#c85a32] transition duration-200"
            />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;