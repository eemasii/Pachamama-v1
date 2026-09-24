import React from 'react';
import type { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from './utils/whatsapp';
import { STORE_CONFIG } from '../constants/config';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const handleSendWhatsApp = () => {
    const url = generateWhatsAppLink(cartItems, total);
    if (url) window.open(url, '_blank');
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen
          ? 'pointer-events-auto visible'
          : 'pointer-events-none invisible'
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out cursor-pointer ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#f7f4ed] shadow-2xl flex flex-col justify-between transform-gpu will-change-transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cabecera con Botón de Vaciar Carrito en Rojo */}
        <div className="p-5 bg-[#1b3b2b] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#f39c12]" />
            <h2 className="text-lg font-bold tracking-wide">Mi Pedido</h2>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                title="Vaciar todo el carrito"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Vaciar</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 active:scale-95 transition cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-6 h-6 text-[#f8f6f0]" />
            </button>
          </div>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300" />
              <p className="text-gray-500 font-medium">
                Tu carrito está vacío.
              </p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Elegí tus productos favoritos del catálogo para iniciar tu pedido.
              </p>
            </div>
          ) : (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="bg-white rounded-xl p-3 border border-gray-200 shadow-xs flex items-center gap-3"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-16 h-16 object-contain rounded-lg bg-[#f3efe6] p-1 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 text-sm truncate">
                    {product.title}
                  </h4>
                  <p className="text-xs text-[#1b3b2b] font-semibold mt-0.5">
                    ${(product.price * quantity).toLocaleString(STORE_CONFIG.currency)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(product._id, -1)}
                      className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product._id, 1)}
                      className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(product._id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition cursor-pointer"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Pie del Carrito */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-white border-t border-gray-200 space-y-4 shadow-lg">
            <div className="flex justify-between items-center text-gray-800">
              <span className="font-medium text-sm">Total estimado</span>
              <span className="text-2xl font-black text-[#1b3b2b]">
                ${total.toLocaleString(STORE_CONFIG.currency)}
              </span>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Enviar Pedido por WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};