import type { CartItem } from '../../types';

export const PHONE_NUMBER = '5493764000000'; // Reemplazar por el número de WhatsApp de Pachamama Colorada

export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  let text = '🌱 *¡Hola Pachamama Colorada! Quisiera realizar el siguiente pedido:*\n\n';

  items.forEach((item) => {
    const subtotal = item.product.price * item.quantity;
    text += `• *${item.quantity}x* ${item.product.title} - $${subtotal.toLocaleString('es-AR')}\n`;
  });

  text += `\n💰 *Total Estimado:* $${total.toLocaleString('es-AR')}\n\n`;
  text += '📍 Quedo a la espera para coordinar el pago y retiro/envío. ¡Muchas gracias!';

  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Alias para evitar errores de importación si algún componente usa este nombre
export const generateWhatsAppLink = generateWhatsAppMessage;