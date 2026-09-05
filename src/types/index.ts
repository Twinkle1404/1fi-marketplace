export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  totalPayable: number;
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
  description: string;
  variants: ProductVariant[];
  emiPlans: EMIPlan[];
}
