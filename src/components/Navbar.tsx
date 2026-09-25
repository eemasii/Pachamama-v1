import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Leaf, Clock } from 'lucide-react';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

// Función auxiliar para determinar si el local está abierto
const checkIsOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const minutes = now.getHours() * 60 + now.getMinutes();

  const m8_00 = 8 * 60;          // 08:00 hs (480 min)
  const m12_30 = 12 * 60 + 30;   // 12:30 hs (750 min)
  const m15_30 = 15 * 60 + 30;   // 15:30 hs (930 min)
  const m20_00 = 20 * 60;        // 20:00 hs (1200 min)

  // Domingo: Cerrado todo el día
  if (day === 0) return false;

  // Lunes a Viernes: 08:00 a 12:30 hs y 15:30 a 20:00 hs
  if (day >= 1 && day <= 5) {
    return (minutes >= m8_00 && minutes < m12_30) || (minutes >= m15_30 && minutes < m20_00);
  }

  // Sábados: 08:00 a 12:30 hs
  if (day === 6) {
    return minutes >= m8_00 && minutes < m12_30;
  }

  return false;
};

export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(checkIsOpen);

  // Revalida el estado del horario cada 60 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(checkIsOpen());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#1b3b2b] text-[#f8f6f0] shadow-md border-b border-[#c85a32]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-20 flex flex-wrap items-center justify-between gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
        
        {/* Columna 1 (Izquierda): Logo / Marca */}
        <div className="flex items-center gap-2.5 sm:gap-3 order-1 sm:order-none justify-start min-w-0">
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

        {/* Columna 2 (Centro): Buscador Exactamente Centrado */}
        <div className="w-full order-3 sm:order-none sm:w-auto flex justify-center">
          <div className="relative w-full sm:max-w-md">
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

        {/* Columna 3 (Derecha): Horarios + Carrito */}
        <div className="flex items-center justify-end gap-3 order-2 sm:order-none">
          
          {/* Badge Dinámico de Horarios (Visible en pantallas grandes) */}
          <div className="hidden xl:flex items-center gap-3 bg-white/5 border border-white/10 py-2 px-3.5 rounded-xl whitespace-nowrap">
            <Clock className="w-4 h-4 text-[#e28763] flex-shrink-0" />
            
            <div className="text-[11px] leading-snug space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">Lun a Vie:</span>
                <span className="text-emerald-100/80">8 a 12:30 / 15:30 a 20 hs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">Sábados:</span>
                <span className="text-emerald-100/80">8 a 12:30 hs</span>
              </div>
            </div>

            <div className="w-px h-6 bg-emerald-500/30 mx-0.5" />

            {/* Estado Dinámico Abierto / Cerrado */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                }`}
              />
              <span
                className={`font-bold text-xs ${
                  isOpen ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {isOpen ? 'Abierto' : 'Cerrado'}
              </span>
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

      </div>
    </header>
  );
};

export default Navbar;