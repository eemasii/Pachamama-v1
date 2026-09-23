import React from 'react';
import type { CartItem } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSendWhatsApp = () => {
    // Número de WhatsApp del local (reemplazar por el real)
    const phoneNumber = "5491112345678"; 
    
    let text = "🌿 *¡Hola Pachamama Colorada!* Quisiera realizar el siguiente pedido:\n\n";
    cartItems.forEach((item) => {
      text += `• *${item.product.title}* (${item.quantity}u) - $${(
        item.product.price * item.quantity
      ).toLocaleString('es-AR')}\n`;
    });
    text += `\n💰 *Total estimado:* $${total.toLocaleString('es-AR')}\n\n`;
    text += "¡Quedo a la espera para coordinar la entrega o retiro!";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#f8f6f0] shadow-xl flex flex-col">
          
          {/* Header Carrito */}
          <div className="p-4 bg-[#1b3b2b] text-white flex items-center justify-between">
            <h2 className="text-lg font-bold">Tu Carrito de Compras</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">El carrito está vacío</p>
                <p className="text-sm mt-1">¡Agregá tus productos preferidos de la dietética!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white p-3 rounded-xl border border-gray-200 flex gap-3 items-center"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">
                      {item.product.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      ${item.product.price.toLocaleString('es-AR')} c/u
                    </p>
                    
                    {/* Controles cantidad */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product._id, -1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product._id, 1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-[#1b3b2b] text-sm block">
                      ${(item.product.price * item.quantity).toLocaleString('es-AR')}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.product._id)}
                      className="text-red-500 hover:text-red-700 p-1 mt-1 inline-block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-white border-t border-gray-200 space-y-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-700">Total:</span>
                <span className="text-[#1b3b2b]">
                  ${total.toLocaleString('es-AR')}
                </span>
              </div>

              <button
                onClick={handleSendWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition duration-200 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar Pedido por WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};