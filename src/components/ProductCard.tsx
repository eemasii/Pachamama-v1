import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 shadow-sm hover:shadow-md transition duration-200 flex flex-col h-full group">
      
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            // Imagen por defecto si falla el link
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600';
          }}
        />
        <span className="absolute top-3 left-3 bg-[#1b3b2b]/90 text-white text-xs px-2.5 py-1 rounded-full font-medium">
          {product.category}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-[#1b3b2b] transition">
            {product.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Precio y Botón */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
          <div>
            <span className="text-xl font-extrabold text-[#1b3b2b]">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {product.unit && (
              <span className="text-xs text-gray-500 block">{product.unit}</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1 bg-[#1b3b2b] hover:bg-[#c85a32] text-white px-3 py-2 rounded-xl text-sm font-semibold transition duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};