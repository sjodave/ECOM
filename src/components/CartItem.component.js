import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  deleteWishlistItem,
  setWishlist,
  // useFetchProductQuery,
} from "../utils/store";
import "../Styles/CartItem.css";
import isObjectInArray from "../Helper/isObjectInArray";
import { useEffect } from "react";
import priceAfterDiscount from "../Helper/priceAfterDiscount";

export default function CartItemCard({ item }) {
  // const { data } = useFetchProductQuery(item.id);
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const { cartProducts } = useSelector((state) => state.cartProducts);
  const dispatch = useDispatch();
  let isItemInWishlist = isObjectInArray(wishlistProducts, item.id);
  let isItemInCart = isObjectInArray(cartProducts, item.id);
  useEffect(() => {}, [isItemInCart]);
  const handleWishlistAction = () => {
    if (isItemInWishlist) return dispatch(deleteWishlistItem(item.id));
    dispatch(setWishlist(item));
  };
  const removeFromCart = () => {
    dispatch(deleteCartItem(item.id));
  };
  const discountedPrice = priceAfterDiscount(
    item.price,
    item.discountPercentage
  );

  return (
    <div className="Item-container">
      <div className="Item-details">
        <img className="Item-image" src={item?.images[0]} alt="" />
        <div className="Item-desc">
          <div className="Item-details-main">
            <div className="Item-name-container">
              <div className="Item-brand">{item?.brand}</div>
              <div className="Item-name">{item.title}</div>
            </div>
            <div className="Item-price">
              <div>
                <i className="fas fa-rupee-sign icon-rupee"></i>
                {discountedPrice}
              </div>
              <div>
                <span className="orignal-price">$ {item.price}</span>
                <span className="discount-percent">
                  {item.discountPercentage}%
                </span>
                {/* <span className=""> Quantity :{item.quantity}</span> */}
              </div>
            </div>
          </div>
          <div className="Item-action-buttons">
            <button
              onClick={() => removeFromCart()}
              className="Item-action-button button-remove"
            >
              {isItemInCart && "Remove"}
            </button>
            <button
              onClick={handleWishlistAction}
              className="Item-action-button button-wishlist"
            >
              {isItemInWishlist ? "Remove from WishList" : "Move to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
