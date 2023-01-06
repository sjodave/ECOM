import React from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product.component";

export default function Wishlist() {
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  let content = wishlistProducts?.map((product) => {
    return <Product key={product.id} product={product}></Product>;
  });

  return <div className="flex gap-6 flex-wrap mt-5 margin-left">{content}</div>;
}
