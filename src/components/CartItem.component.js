import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  deleteWishlistItem,
  setWishlist,
  useFetchProductQuery,
} from "../utils/store";
import "../Styles/CartItem.css";
import { useState } from "react";
export default function CartItemCard({ item }) {
  const { data } = useFetchProductQuery(item.id);
  const { wishlistProducts } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  // const [wishlist, setWishlist] = useState(wishlistProducts);
  let isItemInWishlist = wishlistProducts.find(
    (product) => product.id === item.id
  );

  const handleWishlistAction = () => {
    if (isItemInWishlist) return dispatch(deleteWishlistItem(item.id));
    dispatch(setWishlist(data));
  };
  const removeFromCart = (itemId) => {
    dispatch(deleteCartItem(itemId));
  };
  return (
    <div className="Item-container">
      <div className="Item-details">
        <img className="Item-image" src={data?.images[0]} alt="" />
        <div className="Item-desc">
          <div className="Item-details-main">
            <div className="Item-name-container">
              <div className="Item-brand">{item.brand}</div>
              <div className="Item-name">{item.name}</div>
            </div>
            <div className="Item-price">
              <div>
                <i className="fas fa-rupee-sign icon-rupee"></i>
                {item.discountedPrice}
              </div>
              <div>
                <span className="orignal-price">$ {item.price}</span>
                <span className="discount-percent">
                  {item.discountPercentage}%
                </span>
                <span className=""> Quantity :{item.quantity}</span>
              </div>
            </div>
          </div>
          <div className="Item-action-buttons">
            <button
              onClick={() => removeFromCart(item.id)}
              className="Item-action-button button-remove"
            >
              Remove
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
