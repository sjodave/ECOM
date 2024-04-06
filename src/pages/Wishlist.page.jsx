import React from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product.component";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  let content = wishlistProducts?.map((product) => {
    return <Product key={product.id} product={product}></Product>;
  });
  const itemsInWishlist = wishlistProducts?.length || 0;
  const navigate = useNavigate();

  if (!itemsInWishlist) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-white py-8 px-12">
          <p className="mb-4 text-lg text-gray-600">
            Your wishlist is currently empty
          </p>
          <button
            className="w-full rounded bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

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
