import { getProducts } from "@/lib/api/product";

export default async function Home() {
  const products = await getProducts("desc");
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.id} - {p.title}</li>
      ))}
    </ul>
  );
}