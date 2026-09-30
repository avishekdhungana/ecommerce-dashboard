export interface Rating {
  rate: number;
  count: number;
}

export type SortOrder = "asc" | "desc";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}