import { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { LoadMoreTrigger } from './components/LoadMoreTrigger';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { useCart } from './hooks/useCart';
import { usePagination } from './hooks/usePagination';

export function App() {
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

  const {
    displayedItems,
    hasMore,
    totalItems,
    loadedCount,
    loadMore,
  } = usePagination({
    items: filteredProducts,
    itemsPerPage: 12,
    resetDependencies: [searchTerm, selectedCategory],
  });

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
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedItems.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>

          <LoadMoreTrigger
            hasMore={hasMore}
            loadedCount={loadedCount}
            totalItems={totalItems}
            onLoadMore={loadMore}
          />

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl font-medium text-gray-600">
                No se encontraron productos en esta categoría o búsqueda.
              </p>
            </div>
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