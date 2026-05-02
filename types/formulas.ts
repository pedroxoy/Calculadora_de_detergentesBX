export interface Ingredient {
  name: string;
  code: string;
  amountPerLiter: number;
  unit: 'ml' | 'gr' | 'gotas' | 'cdtas';
  pricePerUnit?: number; // Precio por unidad base (por ml o por gr)
}

export interface ProductFormula {
  id: string;
  name: string;
  description: string;
  category: string;
  ingredients: Ingredient[];
  mixingOrder: string[];
  notes: string[];
  totalBaseAmount: number; // Suma de la formula base
  yieldPerLiter: number; // Producto final por litro de mezcla (1 = 1 litro por litro)
}

export interface CalculatedRecipe {
  product: ProductFormula;
  quantityLiters: number;
  quantityGallons: number;
  ingredients: {
    name: string;
    code: string;
    amount: number;
    unit: string;
    cost: number;
  }[];
  totalCost: number;
  totalAmount: number;
}
