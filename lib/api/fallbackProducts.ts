import type { Product, SortOrder } from "@/types/product";

export const fallbackProducts: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Bracelet",
    price: 695,
    description: "A distinctive piece from the Legends Collection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive",
    price: 64,
    description: "Portable storage with fast USB 3.0 data transfers.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket",
    price: 56.99,
    description: "A versatile jacket with a detachable liner for changing weather.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
    rating: { rate: 2.6, count: 235 },
  },
];

export function sortFallbackProducts(sort?: SortOrder): Product[] {
  if (!sort) return fallbackProducts;

  return [...fallbackProducts].sort((left, right) =>
    sort === "asc" ? left.price - right.price : right.price - left.price
  );
}
