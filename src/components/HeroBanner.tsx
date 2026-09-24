import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative bg-[#1b3b2b] text-[#f8f6f0] py-14 px-4 overflow-hidden border-b-4 border-[#c85a32]">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c85a32_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-4">
        <span className="inline-block bg-[#c85a32]/20 text-[#f39c12] border border-[#c85a32]/30 text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold">
          🌿 Alimentación Consciente & Saludable
        </span>
        
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Todo lo bueno de la tierra, <br className="hidden sm:inline" />
          <span className="text-[#e28763]">directo a tu mesa</span>
        </h2>

        <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Frutos secos seleccionados, semillas puras, harinas alternativas y alimentos naturales. Armá tu carrito online y recibilo donde quieras.
        </p>

        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-emerald-100 font-medium">
          <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
            🌾 100% Calidad
          </div>
          <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
            🚚 Envíos Locales
          </div>
          <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
            🌱 Opciones Sin TACC
          </div>
          <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
            💬 Pedidos por WhatsApp
          </div>
        </div>
      </div>
    </section>
  );
};