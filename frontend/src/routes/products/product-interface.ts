
export interface ProductsProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

export type ProductsList = ProductsProps[];

export interface ProductListProps {
  items: ProductsList;
}

export type ProductListResponse = Awaited<ProductListProps>;

export type ProductResponse = Awaited<ProductsProps>;