import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  onOpenCart: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, onOpenCart }) => {
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      setDisplayMessage(message);
      // Damos un tick (20ms) para que el navegador registre el estado oculto antes de iniciar la animación
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message]);

  return (
    <div
      className={`fixed bottom-5 right-5 left-5 sm:left-auto sm:max-w-sm z-50 flex items-center justify-between gap-3 bg-[#1b3b2b] text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-700/50 transform-gpu transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0" />
        <p className="text-xs font-medium truncate">{displayMessage}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => {
            onClose();
            onOpenCart();
          }}
          className="flex items-center gap-1 bg-[#c85a32] hover:bg-[#b34e2a] active:scale-95 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition cursor-pointer"
        >
          <ShoppingBag className="w-3 h-3" />
          <span>Ver</span>
        </button>

        <button
          onClick={onClose}
          className="p-1 text-gray-300 hover:text-white rounded-full transition cursor-pointer"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};