import { useState, useEffect, useCallback } from 'react';
import type { Product } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { useCart } from './hooks/useCart';
import { Loader2, ChevronDown } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';
const CATEGORIES_API_URL = API_URL.replace('/products', '/categories');
const PAGE_SIZE = 12;

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
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

  // Obtener categorías reales de MongoDB Atlas
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(CATEGORIES_API_URL);
      const data = await res.json();
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  }, []);

  // Consulta global a la base de datos
  const fetchProducts = useCallback(
    async (targetPage: number, isNewFilter: boolean) => {
      try {
        if (isNewFilter) {
          setLoadingInitial(true);
        } else {
          setLoadingMore(true);
        }
        setError(false);

        const params = new URLSearchParams();
        params.append('page', targetPage.toString());
        params.append('limit', PAGE_SIZE.toString());

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
          if (isNewFilter) {
            setProducts(data.products);
          } else {
            setProducts((prev) => [...prev, ...data.products]);
          }
          setHasMore(data.pagination.hasMore);
          setTotalItems(data.pagination.total);
        } else {
          throw new Error('Formato de respuesta no válido');
        }
      } catch (err) {
        console.error('Error cargando catálogo desde la base de datos:', err);
        setError(true);
      } finally {
        setLoadingInitial(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, searchTerm]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      fetchProducts(1, true);
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, false);
  };

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
            categories={['Todos', ...categories]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {loadingInitial ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 text-[#c85a32] animate-spin" />
              <p className="text-sm font-bold text-[#1b3b2b]">
                Cargando catálogo...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-red-200 shadow-xs max-w-md mx-auto my-8 p-6">
              <p className="text-base font-bold text-red-600">
                No se pudo cargar el catálogo
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Asegúrate de que el servidor backend (`pachamama-api`) esté encendido.
              </p>
              <button
                onClick={() => fetchProducts(1, true)}
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

              {hasMore && (
                <div className="mt-10 flex flex-col items-center justify-center gap-2">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-[#1b3b2b] hover:bg-[#132a1e] text-white font-extrabold text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#c85a32]" />
                        <span>Cargando más productos...</span>
                      </>
                    ) : (
                      <>
                        <span>Ver más productos</span>
                        <ChevronDown className="w-4 h-4 text-[#c85a32]" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 font-medium">
                    Mostrando {products.length} de {totalItems} productos coincidentes
                  </p>
                </div>
              )}

              {products.length === 0 && (
                <div className="text-center py-20 bg-white/50 rounded-3xl border border-gray-200/60 my-8">
                  <p className="text-lg font-bold text-gray-700">
                    No se encontraron productos.
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