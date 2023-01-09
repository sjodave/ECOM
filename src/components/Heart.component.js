import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { TiHeartFullOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import isObjectInArray from "../Helper/isObjectInArray";
import { deleteWishlistItem, setWishlist } from "../utils/store";

export default function Heart({ product }) {
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  let isProductInWishlist = isObjectInArray(wishlistProducts, product.id);
  const handleWishlistAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isProductInWishlist) return dispatch(deleteWishlistItem(product.id));
    dispatch(setWishlist(product));
  };
  return (
    <button
      className="rounded text-red hover:bg-gray-200 p-3 ml-3"
      onClick={handleWishlistAction}
    >
      {isProductInWishlist ? (
        <TiHeartFullOutline className="text-lg text-red-500" />
      ) : (
        <AiOutlineHeart className="text-lg" />
      )}
    </button>
  );
}
