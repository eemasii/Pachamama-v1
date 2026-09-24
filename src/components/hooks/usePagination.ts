import { useState, useEffect, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  resetDependencies?: any[];
}

export function usePagination<T>({
  items,
  itemsPerPage = 12,
  resetDependencies = [],
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reiniciar a la página 1 cada vez que cambien los filtros (búsqueda o categoría)
  useEffect(() => {
    setCurrentPage(1);
  }, resetDependencies);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const hasMore = currentPage < totalPages;

  // Productos que se deben renderizar hasta la página actual
  const displayedItems = useMemo(() => {
    return items.slice(0, currentPage * itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return {
    displayedItems,
    hasMore,
    totalItems: items.length,
    loadedCount: displayedItems.length,
    loadMore,
  };
}