import React from 'react';
import { ShoppingBag, Search, Leaf } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#1b3b2b] text-[#f8f6f0] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo / Marca */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-[#c85a32] p-2 rounded-full text-white">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white leading-none">
              Pachamama
            </h1>
            <span className="text-xs uppercase tracking-widest text-[#c85a32] font-semibold">
              Colorada • Dietética
            </span>
          </div>
        </div>

        {/* Buscador */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar frutos secos, harinas, semillas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-gray-300 pl-10 pr-4 py-2 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#c85a32]"
            />
          </div>
        </div>

        {/* Botón Carrito */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 bg-[#c85a32] hover:bg-[#a44522] text-white px-4 py-2 rounded-full transition duration-200 font-medium shadow-sm cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="hidden sm:inline">Mi Pedido</span>
          {cartCount > 0 && (
            <span className="bg-white text-[#c85a32] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Buscador móvil */}
      <div className="p-3 bg-[#12281d] md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-gray-300 pl-9 pr-4 py-1.5 text-sm rounded-full border border-white/20 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};