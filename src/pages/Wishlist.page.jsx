import React from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product.component";

export default function Wishlist() {
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  let content = wishlistProducts?.map((product) => {
    return <Product key={product.id} product={product}></Product>;
  });
  const itemsInWishlist = wishlistProducts?.length || 0;

  return (
    <>
      <div>Wishlist Items: {itemsInWishlist}</div>
      <div className="border-block border">
        <ul className="mt-5 flex flex-1 flex-wrap justify-evenly gap-6">
          {content}
        </ul>
      </div>
    </>
  );
}
