import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { TiHeartFullOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import isObjectInArray from "../Helper/isObjectInArray";
import useDisplayFeedback from "../Hooks/useFeedback";
import { deleteWishlistItem, setWishlist } from "../utils/store";
import DisplayFeedback from "./DisplayFeedback";

export default function Heart({ product }) {
  const { isOpen, setIsOpen, msg, setMsg } = useDisplayFeedback();
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  let isProductInWishlist = isObjectInArray(wishlistProducts, product.id);
  const handleWishlistAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isProductInWishlist) {
      setMsg("Removed from Wishlist");
      setIsOpen(true);
      return dispatch(deleteWishlistItem(product.id));
    }
    setMsg("Added to Wishlist");
    setIsOpen(true);
    dispatch(setWishlist(product));
  };
  return (
    <div>
      <DisplayFeedback isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />
      <button
        className="btn-cart"
        onClick={handleWishlistAction}
        data-testid="heart"
      >
        {isProductInWishlist ? (
          <TiHeartFullOutline className="animate-bounce text-lg text-red-500" />
        ) : (
          <AiOutlineHeart className="text-lg" />
        )}
      </button>
    </div>
  );
}
