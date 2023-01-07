import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TiHeartFullOutline } from "react-icons/ti";
import { setCart, useFetchProductQuery, setWishlist } from "../utils/store";

const ProductDetails = () => {
  const { id: userId } = useSelector((state) => state.auth);
  const { cartProducts } = useSelector((state) => state.cartProducts);

  // useEffect(() => {
  //   cartProducts?.length &&
  //     localStorage.setItem(`cart`, JSON.stringify(cartProducts));
  // }, []);

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const { data, error, isFetching } = useFetchProductQuery(productId);
  const navigate = useNavigate();

  const goToCart = async () => {
    navigate("/cart");
  };
  const addToCart = () => {
    dispatch(setCart(data));
  };
  const addToWishList = () => {
    dispatch(setWishlist(data));
  };

  if (isFetching) return;
  if (error) return <div>{error}</div>;
  if (data) {
    const { id, images, title, price, description, category, rating } = data;
    return (
      <>
        <div className="flex flex-row margin-left">
          <img
            src={images[0]}
            alt={title}
            style={{ height: "200px", width: "200px" }}
          />
          <div className="col-8">
            <div className=" text-muted">{category}</div>
            <h4>{`Title: ${title}`}</h4>
            <div>{`Description: ${description}`}</div>
            <div>{`Price: ${price}`}</div>
            <div>{`Rating: ${rating}`}</div>
            <button
              className="bg-blue-500 rounded text-white hover:bg-blue-700 p-2"
              onClick={addToCart}
            >
              Add To Cart
            </button>
            <button
              className="bg-blue-500 rounded text-white hover:bg-blue-700 p-2 ml-3"
              onClick={goToCart}
            >
              Go To Cart
            </button>
            <button
              className="bg-gray-100 rounded text-red hover:bg-blue-200 p-2 ml-3"
              onClick={addToWishList}
            >
              <TiHeartFullOutline />
            </button>
          </div>
        </div>
      </>
    );
  }
};
export default ProductDetails;
