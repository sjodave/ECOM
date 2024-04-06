import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem.component";
import DisplayFeedback from "../components/DisplayFeedback";
import calculateTotal from "../Helper/calculateTotal";
import priceAfterDiscount from "../Helper/priceAfterDiscount";
import useDisplayFeedback from "../Hooks/useFeedback";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../utils/store";
export default function Cart() {
  const dispatch = useDispatch();
  const { isOpen, setIsOpen, msg, setMsg } = useDisplayFeedback();
  const navigate = useNavigate();
  const { cartProducts: cart } = useSelector((state) => state.cartProducts);
  const discountedTotal = cart.reduce((acc, product) => {
    return (acc += +priceAfterDiscount(
      product.price,
      product.discountPercentage
    ));
  }, 0);
  const cartTotal = calculateTotal(cart, "price");
  const handleOrder = () => {
    setMsg("Order Placed");
    setIsOpen(true);
    dispatch(emptyCart());
  };

  if (cart.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg bg-white py-8 px-12">
          <p className="mb-4 text-lg text-gray-600">
            Your cart is currently empty
          </p>
          <button
            className="w-full rounded bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
        <DisplayFeedback isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />
      </div>
    );
  }
  return (
    <>
      <section className="mr-5 flex flex-wrap gap-3">
        <div className=" flex-1 border border-solid  p-4 lg:p-8">
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
        <div className=" h-full w-full border border-solid px-3 py-4 text-sm lg:w-[30%]">
          <div className=" mt-4 space-y-5">
            <div className=" text-gray-700">
              PRICE DETAILS ({cart.length} items)
            </div>
            <div className=" space-y-3">
              <div className=" flex justify-between">
                <span>Total MRP</span>
                <span>$ {cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount on MRP</span>
                <span className="text-green-600">
                  -&nbsp;
                  <i className="color-green"></i>$ {cartTotal - discountedTotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className=" text-green-600">FREE</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold ">
                <span>Total Amount</span>
                <span>$ {discountedTotal}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="btn-primary" onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </div>
      </section>
      <DisplayFeedback isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />
    </>
  );
}
