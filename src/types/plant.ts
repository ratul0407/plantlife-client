export interface Response<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface Plant {
  _id: string;
  name: string;
  description: string;
  category: string;
  inStock: boolean;
  tags: any[];
  variants: Variant[];
  additionalImages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  variantName: string;
  price: number;
  inStock: boolean;
  stock: number;
  image: string;
  sku: string;
}
