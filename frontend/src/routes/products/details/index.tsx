import { useEffect, useState } from "react";
import { ProductResponse, ProductsProps } from "../product-interface";

export default function ProductDetail() {
  const [product, setProduct] = useState<ProductsProps | null>(null);

  const obtainIDfromURL = () => {
    const url = window.location.href;
    const urlList = url.split("/");
    const id = urlList[4];
    return id;
  };

  useEffect(() => {
    const getProductById = async () => {
      const res = await fetch(
        `http://localhost:8000/products/${obtainIDfromURL()}`
      );
      const product: ProductResponse = await res.json();

      setProduct(product);
    };

    getProductById();
  }, []);

  if (product === null) {
    return <div>No product found</div>;
  }

  return (
    <div>
      <span>
        {product.name} {product.price}
      </span>
    </div>
  );
}
