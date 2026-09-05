import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../api/marketplace';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    setProducts([]);

    fetchProducts()
      .then((data) => {
        if (mountedRef.current) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { products, loading, error, refetch: load };
}
