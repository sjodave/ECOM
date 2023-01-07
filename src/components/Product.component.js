import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { TiHeartFullOutline } from "react-icons/ti";
import isObjectInArray from "../Helper/isObjectInArray";

import "../Styles/product.css";
import {
  deleteCartItem,
  deleteWishlistItem,
  setWishlist,
  setCart,
} from "../utils/store";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { displayFeedback, setFeedbackText } = useContext(FeedbackContext);

  const { cartProducts } = useSelector((state) => state.cartProducts);
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  let isProductInCart = isObjectInArray(cartProducts, product.id);
  let isProductInWishlist = isObjectInArray(wishlistProducts, product.id);

  console.log(product);
  const priceAfterDiscount = (
    (product.price * (100 - product.discountPercentage)) /
    100
  ).toFixed(0);
  const handleCartActions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isProductInCart) {
      // displayFeedback("Removed From Cart");
      isProductInCart = false;
      dispatch(deleteCartItem(product.id));
    } else {
      // displayFeedback("Added to Cart");
      isProductInCart = true;
      dispatch(setCart(product));
    }
  };
  const handleWishlistActions = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isProductInWishlist) {
      // displayFeedback("Removed From Wishlist");
      isProductInWishlist = false;
      dispatch(deleteWishlistItem(product.id));
    } else {
      // displayFeedback("Added to Wishlist");
      isProductInWishlist = true;
      dispatch(setWishlist(product));
    }
  };
  return (
    <div className="ProductCard">
      <div
        className="ProductCard-body w-36 md:w-44 mb-5 cursor-pointer"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          className="Product-image  object-fill"
          src={product.thumbnail}
          alt=""
        />
        <div className="Product-info">
          <div className="Product-actions">
            <div className="Action-Buttons">
              <button
                onClick={handleWishlistActions}
                className="Action-button "
              >
                {isProductInWishlist ? (
                  <TiHeartFullOutline className="text-lg text-red-500" />
                ) : (
                  <AiOutlineHeart className="text-lg" />
                )}
              </button>
              &nbsp;
              <button
                onClick={handleCartActions}
                className="Action-button Button-cart"
              >
                {isProductInCart ? "Remove From Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
          <h3 className="Product-brand mt-2">{product.brand}</h3>
          <h4 className="Product-name">{product.title}</h4>
          <div className="Product-price">
            <span>
              <span className="Product-discountedPrice">
                $ {priceAfterDiscount}
              </span>
              <span className="Product-orignalPrice">${product.price}</span>
            </span>
            <span className="Product-discountPercent">
              ({product.discountPercentage}% OFF)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
