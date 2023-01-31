import React from "react";
import { useSelector } from "react-redux";
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
      <section className="flex flex-wrap gap-3">
        <div className=" flex-1 border border-solid  p-8">
          <div className="mb-4 flex justify-between font-semibold ">
            <span>My Cart ({cart.length} items)</span>
            <span>Total After Discount: ${discountedTotal}</span>
          </div>
          <ul>
            {cart.length === 0 ? <h3>Cart Empty</h3> : ""}
            {cart.map((item) => (
              <CartItem id={item.id} key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <div className=" border border-solid px-3 py-4 text-sm lg:w-[30%]">
          <div className=" mt-4 space-y-5">
            <div className=" text-gray-700">
              PRICE DETAILS ({cart.length} items)
            </div>
            <div className=" space-y-3">
              <div className=" flex justify-between">
                <span>Total MRP</span>
                <span>{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount on MRP</span>
                <span className="text-green-600">
                  -&nbsp;
                  <i className="color-green"></i>
                  {cartTotal - discountedTotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className=" text-green-600">FREE</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold ">
                <span>Total Amount</span>
                <span>{discountedTotal}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="btn-primary">Place Order</button>
          </div>
        </div>
      </section>
    </>
  );
}
