import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../Styles/Cart.page.css";
import { useAddCartItemMutation } from "../utils/store";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem.component";

export default function Cart() {
  const [addedCart, setCart] = useState([]);
  const { id } = useSelector((state) => state.auth);

  const cartProducts = JSON.parse(localStorage.getItem(`cart`));
  console.log(id);
  const productsList = cartProducts?.map((product) => {
    return {
      id: product.id,
      quantity: 1,
    };
  });
  const [addItem] = useAddCartItemMutation();

  useEffect(() => {
    addItem({ id, productsList })
      .unwrap()
      .then((data) => setCart(data.products));
  }, []);
  const navigate = useNavigate();

  const cart = addedCart;
  console.log(cart);
  const cartTotal = cart.reduce((acc, product) => {
    return (acc += product.price * product.quantity);
  }, 0);
  const discountedTotal = cart.reduce((acc, product) => {
    return (acc += product.discountedPrice);
  }, 0);

  return (
    <div className=" margin-left">
      <section className="Cart-container">
        <div className="Cart-products">
          <div className="Cart-products-title">
            <span>My Cart ({cart.length} items)</span>
            <span>Total: Rs.{cartTotal}</span>
          </div>
          <div className="Cart-items-container">
            {cart.length === 0 ? <h3>Cart Empty</h3> : ""}
            {cart.map((item) => (
              <CartItem id={item.id} key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="Cart-checkout">
          <div className="Price-container">
            <div className="Price-header">
              PRICE DETAILS ({cart.length} items)
            </div>
            <div className="Price-breakup-container">
              <div className="Price-breakup-row">
                <span className="Price-title">Total MRP</span>
                <span className="Price-value">
                  <i className="fas fa-rupee-sign icon-rupee"></i>
                  {cartTotal}
                </span>
              </div>
              <div className="Price-breakup-row">
                <span className="Price-title">Discount on MRP</span>
                <span className="Price-value color-green">
                  -&nbsp;
                  <i className="fas fa-rupee-sign icon-rupee color-green"></i>
                  {cartTotal - discountedTotal}
                </span>
              </div>
              <div className="Price-breakup-row">
                <span className="Price-title">Delivery Charges</span>
                <span className="Price-value color-green">FREE</span>
              </div>
              <div className="Price-total-row">
                <span className="Total-header">Total Amount</span>
                <span className="Total-value">
                  <i className="fas fa-rupee-sign icon-rupee"></i>
                  {discountedTotal}
                </span>
              </div>
            </div>
          </div>
          <div className="Button-container">
            <button className="Checkout-button">Place Order</button>
          </div>
        </div>
      </section>
    </div>
  );
}
