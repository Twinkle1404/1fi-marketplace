import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from '../types';
import { fetchProductById } from '../api/marketplace';

interface UseProductReturn {
  product: Product | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useProduct(id: string | undefined): UseProductReturn {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(() => {
    if (!id) {
      setProduct(undefined);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => {
        if (mountedRef.current) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (mountedRef.current) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setLoading(false);
        }
      });
  }, [id]);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { product, loading, error, refetch: load };
}
