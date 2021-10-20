export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  taxes?: number;
}

export interface Category {
  id: number;
  name: string;
  typeImg: string;
}

export interface CreateProductDto extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}
export interface UpdateProductDto extends Partial<CreateProductDto> {}

export const ProductInitValues = {
  id: 0,
  title: '',
  description: '',
  category: {
    id: 0,
    name: '',
    typeImg: '',
  },
  price: 0,
  images: [],
};
