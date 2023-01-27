import React from "react";
import { useSelector } from "react-redux";
import "../Styles/Cart.page.css";
import CartItem from "../components/CartItem.component";
import calculateTotal from "../Helper/calculateTotal";
import priceAfterDiscount from "../Helper/priceAfterDiscount";

export default function Cart() {
  const { cartProducts: cart } = useSelector((state) => state.cartProducts);
  const discountedTotal = cart.reduce((acc, product) => {
    return (acc += +priceAfterDiscount(
      product.price,
      product.discountPercentage
    ));
  }, 0);
  const cartTotal = calculateTotal(cart, "price");

  return (
    <>
      <section className="Cart-container">
        <div className="Cart-products">
          <div className="Cart-products-title">
            <span>My Cart ({cart.length} items)</span>
            <span>Total After Discount: ${discountedTotal}</span>
          </div>
          <ul className="Cart-items-container">
            {cart.length === 0 ? <h3>Cart Empty</h3> : ""}
            {cart.map((item) => (
              <CartItem id={item.id} key={item.id} item={item} />
            ))}
          </ul>
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
    </>
  );
}
