export interface ColorVariant {
  label: string;
  hex: string;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  totalPayable: number;
  cashback?: number;
}

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
  originalPrice?: number;
  isNew?: boolean;
  description: string;
  colorVariants?: ColorVariant[];
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
}
