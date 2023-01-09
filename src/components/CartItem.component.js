import { useDispatch } from "react-redux";
import { deleteCartItem } from "../utils/store";
import "../Styles/CartItem.css";
import priceAfterDiscount from "../Helper/priceAfterDiscount";

import Heart from "./Heart.component";

export default function CartItemCard({ item }) {
  const dispatch = useDispatch();

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
        <img
          className="Item-image"
          src={item?.images[0]}
          alt={item.title}
          style={{ minWidth: "150px" }}
        />
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
              </div>
            </div>
          </div>
          <div className="Item-action-buttons">
            <button
              onClick={() => removeFromCart()}
              className="Checkout-button"
            >
              Remove
            </button>
            <Heart product={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
