import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isObjectInArray from "../Helper/isObjectInArray";
import { IoTrashBin } from "react-icons/io5";
import { RiShoppingCartFill } from "react-icons/ri";
import { deleteCartItem, setCart } from "../utils/store";
import Heart from "./Heart.component";
import RatingStars from "./RatingStars.component";
import DisplayFeedback from "./DisplayFeedback";
import useDisplayFeedback from "../Hooks/useFeedback";

export default function ProductCard({ product }) {
  const { isOpen, setIsOpen, msg, setMsg } = useDisplayFeedback();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      setMsg("Removed From Cart");
      setIsOpen(true);
      isProductInCart = false;
      dispatch(deleteCartItem(product.id));
    } else {
      setMsg("Added to Cart");
      setIsOpen(true);
      isProductInCart = true;
      dispatch(setCart(product));
    }
  };

  return (
    <li onClick={() => navigate(`/products/${product.id}`)}>
      <DisplayFeedback isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />

      <div className="mb-5 w-40 cursor-pointer text-sm md:w-44">
        <img
          className="h-52 w-full object-fill"
          src={product.thumbnail}
          alt={product.title}
        />
        <div>
          <div>
            <div className="flex items-center justify-center">
              <Heart product={product} />
              &nbsp;
              <button onClick={handleCartActions} className="btn-cart">
                {isProductInCart ? <IoTrashBin /> : <RiShoppingCartFill />}
              </button>
            </div>
          </div>

          <div className="mb-1 leading-5">
            <h3 className=" mt-2 truncate text-base  font-semibold ">
              {product.brand}
            </h3>
            <div className=" truncate">{product.title}</div>
            <span>
              <span className=" font-semibold">$ {priceAfterDiscount}</span>
              <span className=" px-2 text-xs text-gray-600 line-through">
                ${product.price}
              </span>
            </span>
            <span className=" text-xs text-red-500">
              ({product.discountPercentage}% OFF)
            </span>
          </div>
          <RatingStars rating={product.rating} />
        </div>
      </div>
    </li>
  );
}
