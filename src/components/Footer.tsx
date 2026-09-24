import { MapPin, Phone, Clock, Leaf } from 'lucide-react';

// Ícono nativo de Instagram para evitar errores de versión en lucide-react
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#1b3b2b] text-[#f8f6f0] border-t border-[#c85a32]/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Grilla simétrica de 3 tercios iguales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Columna 1: Anclada a la izquierda */}
          <div className="flex justify-start">
            <div className="space-y-3 text-left max-w-xs">
              <div className="flex items-center gap-2.5">
                <div className="bg-[#c85a32] p-2 rounded-2xl shadow-inner">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  Pachamama Colorada
                </span>
              </div>
              <p className="text-xs text-emerald-100/70 leading-relaxed">
                Alimentos naturales, frutos secos, semillas y productos orgánicos seleccionados con dedicación.
              </p>
            </div>
          </div>

          {/* Columna 2: Centrada en el eje exacto de la pantalla */}
          <div className="flex justify-start md:justify-center">
            <div className="space-y-3 text-left max-w-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#e28763]">
                Horarios de Atención
              </h3>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#c85a32]/20 text-[#e28763] rounded-2xl flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-bold block text-white text-sm">Lunes a Viernes</span>
                    <span className="text-xs text-emerald-100/80 font-medium">
                      08:00 a 12:30 hs • 15:30 a 20:00 hs
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block text-white text-sm">Sábados</span>
                    <span className="text-xs text-emerald-100/80 font-medium">
                      09:00 a 12:30 hs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 3: Anclada al borde derecho */}
          <div className="flex justify-start md:justify-end">
            <div className="space-y-3 text-left max-w-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#e28763]">
                Contacto
              </h3>
              <ul className="space-y-2.5 text-xs text-emerald-100/80">
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c85a32] flex-shrink-0" />
                  <span>Rademacher 3492</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c85a32] flex-shrink-0" />
                  <span>+54 9 376 480-9283</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <InstagramIcon className="w-4 h-4 text-[#c85a32] flex-shrink-0" />
                  <a
                    href="https://www.instagram.com/pachamamacolorada/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline hover:text-white transition"
                  >
                    @pachamamacolorada
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Derechos de Autor */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-emerald-100/50">
          © {new Date().getFullYear()} Pachamama Colorada. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;