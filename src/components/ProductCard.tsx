import React from 'react';
import type { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      
      {/* Contenedor de la Imagen: Proporción 1:1 Cuadrada */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600';
          }}
        />
        
        {/* Badge Categoría */}
        <span className="absolute top-3 left-3 bg-[#1b3b2b]/90 backdrop-blur-md text-[#f8f6f0] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm tracking-wide z-10">
          {product.category}
        </span>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          <h3 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-[#c85a32] transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
            {product.description || 'Producto fresco y natural de primera calidad.'}
          </p>
        </div>

        {/* Precio y Acción */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-black text-[#1b3b2b] tracking-tight">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {product.unit && (
              <span className="text-[11px] text-gray-400 font-medium block">
                por {product.unit}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 bg-[#1b3b2b] hover:bg-[#c85a32] active:scale-95 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition duration-200 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
};