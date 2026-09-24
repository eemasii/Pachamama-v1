import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadMoreTriggerProps {
  hasMore: boolean;
  loadedCount: number;
  totalItems: number;
  onLoadMore: () => void;
}

export const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({
  hasMore,
  loadedCount,
  totalItems,
  onLoadMore,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '150px' }
    );

    const currentRef = triggerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, onLoadMore]);

  if (totalItems === 0) return null;

  return (
    <div className="mt-10 flex flex-col items-center gap-3 pb-6">
      {/* Indicador de progreso */}
      <p className="text-xs font-semibold text-gray-500 bg-emerald-900/5 px-4 py-1.5 rounded-full border border-emerald-900/10">
        Mostrando <span className="text-[#1b3b2b] font-bold">{loadedCount}</span> de{' '}
        <span className="text-[#1b3b2b] font-bold">{totalItems}</span> productos
      </p>

      {/* Centinela de scroll (dispara la carga al entrar en pantalla) */}
      {hasMore && (
        <div ref={triggerRef} className="pt-2">
          <button
            onClick={onLoadMore}
            className="flex items-center gap-2 bg-white hover:bg-emerald-50 text-[#1b3b2b] border border-gray-300 font-bold text-sm px-6 py-3 rounded-xl shadow-xs transition duration-200 cursor-pointer"
          >
            <Loader2 className="w-4 h-4 animate-spin text-[#c85a32]" />
            <span>Cargando más productos...</span>
          </button>
        </div>
      )}
    </div>
  );
};