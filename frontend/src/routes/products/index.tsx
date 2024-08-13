import { useEffect, useState } from "react";
import {
  ProductsList,
  ProductListResponse,
  ProductsProps,
} from "./product-interface";

export default function Products() {
  const [products, setProducts] = useState<ProductsList>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:8000/products");
      const val: ProductListResponse = await res.json();
      setProducts(val.items);
    };

    getProducts();
  }, []);

  const putProduct = async (product: Partial<ProductsProps>) => {
    console.log(product);
    setProducts((prevList) => {
      return [
        ...prevList,
        { ...product, id: prevList.length + 1 } as ProductsProps,
      ];
    });
    const res = await fetch("http://localhost:8000/products", {
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
      method: "PUT",
    });

    console.log(res);
  };

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      price: { value: number };
      image: { value: string };
    };

    const { name, price, image } = target;

    putProduct({
      name: name.value,
      price: price.value,
      image: image.value,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "5%" }}>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {product.name} {product.price}
          </div>
        ))}
      </div>
      <div>
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="name">Name: </label>
          <input id="name" name="name" />
          <label htmlFor="price">Price: </label>
          <input id="price" name="price" type="number" />
          <label htmlFor="image">Image: </label>
          <input id="image" name="image" type="url" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
