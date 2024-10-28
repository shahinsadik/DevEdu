"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // Update cart item quantity in local storage
  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity > 0 ? quantity : 1;
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.discount_price * item.quantity,
    0
  );

  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
        Cart
      </h1>
      <div className="pt-p_16px">
        <div className="lg:flex items-start gap-3">
          <div className="w-full lg:w-[58%] bg-white border-2">
            <table className="overflow-x-auto w-full">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                    Course
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Price
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] bg text-black">
                    Quantity
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Sub Total
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-x-auto">
                {cartItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-300 overflow-x-auto"
                  >
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="w-[20%] text-center flex items-center justify-center">
                          <RiDeleteBin5Line
                            onClick={() => removeItem(index)}
                            className="text-xl hover:text-footer_color cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
                          <div className="mask">
                            <Image
                              height={500}
                              width={500}
                              className="h-[40px] w-[70px]"
                              src={item.photo || "/placeholder.jpg"} // Placeholder if no image
                              alt="Course"
                            />
                          </div>
                          <p className="text-[14.4px] px-[7px] text-center flex">
                            {item.course_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                        Tk {item.discount_price}
                      </p>
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <button
                          className="px-4 w-[30px] font-bold font_standard my-1.5 border"
                          onClick={() =>
                            updateQuantity(index, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(index, parseInt(e.target.value))
                          }
                          className="font-bold bg-white w-[30px] lg:w-[60px] font_standard text-black p-2 text-center mx-auto h-full border-y"
                        />
                        <button
                          className="px-4 w-[30px] font-bold font_standard my-1.5 border"
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                        Tk {item.discount_price * item.quantity}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:w-[41%] bg-white border-2">
            <div className="px-[30px]">
              <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                Cart Summary
              </h2>
              <div className="py-3 flex justify-between border-b border-gray-300">
                <p className="text-black font-bold">Total Price</p>
                <p className="text-black font-bold">Tk {totalPrice}</p>
              </div>
              <Link
                href="/checkout"
                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
