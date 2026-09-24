import { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from './data/products';
import type { Product, CartItem } from './types';
import './index.css';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filtrado de productos dinámico por búsqueda y categoría
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product._id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product._id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Hero Banner Orgánico */}
        <section className="relative bg-[#1b3b2b] text-[#f8f6f0] py-14 px-4 overflow-hidden border-b-4 border-[#c85a32]">
          {/* Patrón decorativo de fondo */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c85a32_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center space-y-4">
            <span className="inline-block bg-[#c85a32]/20 text-[#f39c12] border border-[#c85a32]/30 text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold">
              🌿 Alimentación Consciente & Saludable
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Todo lo bueno de la tierra, <br className="hidden sm:inline" />
              <span className="text-[#e28763]">directo a tu mesa</span>
            </h2>

            <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Frutos secos seleccionados, semillas puras, harinas alternativas y alimentos naturales. Armá tu carrito online y recibilo donde quieras.
            </p>

            {/* Badges de Garantía */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-xs text-emerald-100 font-medium">
              <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
                🌾 100% Calidad
              </div>
              <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
                🚚 Envíos Locales
              </div>
              <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
                🌱 Opciones Sin TACC
              </div>
              <div className="bg-white/5 border border-white/10 py-2 px-3 rounded-xl backdrop-blur-sm">
                💬 Pedidos por WhatsApp
              </div>
            </div>
          </div>
        </section>

        {/* Contenido Principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filtros de Categorías */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c85a32] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grilla de Productos */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl font-medium text-gray-600">
                No se encontraron productos en esta categoría o búsqueda.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Pie de página */}
      <Footer />

      {/* Carrito Lateral */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;