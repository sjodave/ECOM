import { useDispatch } from "react-redux";
import { deleteCartItem } from "../utils/store";
import priceAfterDiscount from "../Helper/priceAfterDiscount";
import { IoTrashBin } from "react-icons/io5";
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
    <li data-testid="cartItem">
      <div className=" flex items-center space-x-5">
        <div className="flex h-40 w-40 justify-center">
          <img
            className=" max-h-[90%] max-w-[90%] object-contain"
            src={item?.images[0]}
            alt={item.title}
          />
        </div>
        <div className=" text-sm ">
          <div className=" flex  w-full flex-wrap justify-between">
            <div className=" mb-2 w-28">
              <div className=" font-semibold">{item?.brand}</div>
              <div className=" w-16  truncate text-xs text-gray-600">
                {item.title}
              </div>
            </div>
            <div className=" mb-2">
              <div>$ {discountedPrice}</div>
              <div>
                <span className=" text-xs text-gray-600 line-through">
                  $ {item.price}
                </span>
                <span className=" ml-2 text-xs font-light text-red-500">
                  {item.discountPercentage}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <button onClick={() => removeFromCart()} className="btn-cart">
              <IoTrashBin className="text-lg" />
            </button>
            <Heart product={item} />
          </div>
        </div>
      </div>
    </li>
  );
}
