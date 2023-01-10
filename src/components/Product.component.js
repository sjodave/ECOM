import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isObjectInArray from "../Helper/isObjectInArray";

import "../Styles/product.css";
import { deleteCartItem, setCart } from "../utils/store";
import Heart from "./Heart.component";
import RatingStars from "./RatingStars.component";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { displayFeedback, setFeedbackText } = useContext(FeedbackContext);

  const { cartProducts } = useSelector((state) => state.cartProducts);
  let isProductInCart = isObjectInArray(cartProducts, product.id);

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
              <Heart product={product} />
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
            <RatingStars rating={product.rating} />
          </div>
        </div>
      </div>
    </div>
  );
}
