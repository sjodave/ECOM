import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCart, useFetchProductQuery } from "../utils/store";
import RatingStars from "../components/RatingStars.component";
import Heart from "../components/Heart.component";
import isObjectInArray from "../Helper/isObjectInArray";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const { data, error, isFetching, refetch } = useFetchProductQuery(productId);
  const { cartProducts } = useSelector((state) => state.cartProducts);
  let isProductInCart = isObjectInArray(cartProducts, productId);
  const navigate = useNavigate();
  const goToCart = async () => {
    navigate("/cart");
  };
  const addToCart = () => {
    dispatch(setCart(data));
  };

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;
  if (data) {
    const { id, images, title, price, description, category, rating } = data;
    return (
      <>
        <div className="flex flex-row flex-wrap">
          <img src={images[0]} alt={title} className=" max-h-60 max-w-5xl" />
          <div className="col-8 p-5">
            <div className=" text-gray-500 ">{category}</div>
            <h4>{`Title: ${title}`}</h4>
            <div>{`Description: ${description}`}</div>
            <div>{`Price: ${price}`}</div>
            <div className="flex gap-1">
              Rating : <RatingStars rating={rating} /> {rating}
            </div>
            <div className="mt-3">
              {!isProductInCart ? (
                <button className="Checkout-button" onClick={addToCart}>
                  Add To Cart
                </button>
              ) : (
                <button className="Checkout-button" onClick={goToCart}>
                  Go To Cart
                </button>
              )}
              <Heart product={data} />
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default ProductDetails;
