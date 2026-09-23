import rawProducts from './products.json';
import type { Product } from '../types';

export const PRODUCTS: Product[] = (rawProducts as any[]).map((item) => ({
  _id: item._id?.$oid || item._id || String(Math.random()),
  title: item.title || item.nombre || 'Producto',
  description: item.description || item.descripcion || '',
  price: Number(item.price || item.precio || 0),
  imageUrl: item.imageUrl || item.imagen || item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
  category: item.category || item.categoria || 'General',
  unit: item.unit || ''
}));

// Extraemos las categorías únicas de la base de datos automáticamente
export const CATEGORIES = [
  'Todos',
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))).filter(Boolean)
];