import React from 'react';
import type { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-200/80 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between group">
      <div>
        {/* Contenedor de Imagen Lleno y Bien Encuadrado */}
        <div className="relative aspect-square w-full rounded-2xl bg-[#f3efe6] overflow-hidden mb-3">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600';
            }}
          />
          <span className="absolute top-2 left-2 bg-[#c85a32]/10 text-[#c85a32] border border-[#c85a32]/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs z-10">
            {product.category}
          </span>
        </div>

        {/* Título y Descripción */}
        <h3 className="font-extrabold text-[#1b3b2b] text-base leading-snug line-clamp-2">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        )}
      </div>

      {/* Precio y Botón Agregar (Sin etiqueta de unidad) */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
            Precio
          </span>
          <p className="text-lg font-black text-[#1b3b2b] leading-none mt-0.5">
            ${product.price.toLocaleString('es-AR')}
          </p>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-[#1b3b2b] hover:bg-[#c85a32] text-white p-2.5 rounded-2xl transition duration-200 shadow-xs active:scale-95 cursor-pointer flex items-center justify-center"
          title="Agregar al carrito"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;