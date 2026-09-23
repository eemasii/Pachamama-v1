import React from 'react';
import { MapPin, Phone, Clock, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12281d] text-[#f8f6f0] border-t-4 border-[#c85a32] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#c85a32] p-2 rounded-full text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-wide">Pachamama Colorada</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tu dietética de confianza. Productos naturales, semillas, frutos secos y alimentos orgánicos seleccionados con la mejor calidad.
            </p>
          </div>

          {/* Información de contacto */}
          <div className="space-y-3">
            <h4 className="text-[#c85a32] font-semibold text-lg">Contacto y Ubicación</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c85a32] shrink-0" />
                <span>Dirección de tu local (ej: Av. San Martín 1234)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c85a32] shrink-0" />
                <span>+54 9 11 XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#c85a32] shrink-0" />
                <span>Lunes a Sábados: 09:00 a 20:00 hs</span>
              </div>
            </div>
          </div>

          {/* Redes Sociales y Enlaces */}
          <div className="space-y-3">
            <h4 className="text-[#c85a32] font-semibold text-lg">Seguinos</h4>
            <p className="text-gray-300 text-sm">
              Enterate de nuevos ingresos, promociones e ideas de recetas saludables.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#c85a32] text-white px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @pachamama_colorada
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Pachamama Colorada. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};