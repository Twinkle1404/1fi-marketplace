import type { Product } from '../types';
import { mockProducts } from '../data/mockProducts';

const NETWORK_DELAY = 700;
const SIMULATE_RANDOM_ERROR = false;

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_RANDOM_ERROR) {
        reject(new Error('Failed to load marketplace products'));
      } else {
        resolve(mockProducts);
      }
    }, NETWORK_DELAY);
  });
}

export function fetchProductById(id: string): Promise<Product | undefined> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (SIMULATE_RANDOM_ERROR) {
        reject(new Error('Failed to load product'));
      } else {
        resolve(mockProducts.find((product) => product.id === id));
      }
    }, NETWORK_DELAY);
  });
}
