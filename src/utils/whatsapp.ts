import type { CartItem } from '../types';
import { STORE_CONFIG } from '../constants/config';

export function generateWhatsAppLink(cartItems: CartItem[], total: number): string {
  if (cartItems.length === 0) return '';

  let message = `🌿 *NUEVO PEDIDO - ${STORE_CONFIG.name.toUpperCase()}*\n\n`;
  cartItems.forEach((item) => {
    const itemTotal = item.product.price * item.quantity;
    message += `• ${item.product.title} x${item.quantity} - $${itemTotal.toLocaleString(STORE_CONFIG.currency)}\n`;
  });

  message += `\n*Total a pagar: $${total.toLocaleString(STORE_CONFIG.currency)}*`;
  message += '\n\n¡Hola! Quisiera coordinar el envío/retiro de este pedido.';

  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}