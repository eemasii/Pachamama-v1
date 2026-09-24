import { useState, useEffect, useCallback } from 'react';
import type { Product } from './types';
import { CATEGORIES } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { useCart } from './components/hooks/useCart';
import { Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const {
    cartItems,
    isCartOpen,
    cartCount,
    total,
    toastMessage,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    closeToast,
  } = useCart();

  // Consulta a la API / MongoDB Atlas
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const params = new URLSearchParams();
      if (selectedCategory !== 'Todos') {
        params.append('category', selectedCategory);
      }
      if (searchTerm.trim() !== '') {
        params.append('search', searchTerm.trim());
      }

      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) throw new Error('Error al conectar con la API');

      const data = await response.json();

      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        throw new Error('Formato de respuesta no válido');
      }
    } catch (err) {
      console.error('Error cargando catálogo desde la base de datos:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <HeroBanner />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CategoryFilter
            categories={['Todos', ...CATEGORIES]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 text-[#c85a32] animate-spin" />
              <p className="text-sm font-bold text-[#1b3b2b]">
                Cargando productos desde la base de datos...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-red-200 shadow-xs max-w-md mx-auto my-8 p-6">
              <p className="text-base font-bold text-red-600">
                No se pudo cargar el catálogo
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Asegúrate de que el servidor backend (`pachamama-api`) esté encendido (`npm run dev` en su carpeta).
              </p>
              <button
                onClick={fetchProducts}
                className="mt-4 px-4 py-2 bg-[#1b3b2b] text-white text-xs font-bold rounded-xl hover:bg-[#132a1e] transition cursor-pointer"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-20 bg-white/50 rounded-3xl border border-gray-200/60 my-8">
                  <p className="text-lg font-bold text-gray-700">
                    No se encontraron productos en la base de datos.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Prueba buscando con otro término o elige otra categoría.
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      <Toast
        message={toastMessage}
        onClose={closeToast}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}

export default App;