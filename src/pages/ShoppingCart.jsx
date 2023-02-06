import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateCarts } from "../app/api/cart";
import { addItem, cleartItem, removeItem } from "../app/features/cart/actions";
import { useCart } from "../app/features/cart/reducer";
import Navbar from "../components/Navbar";
import { rupiah } from "../utils";

export default function ShoppingCart() {
  const Carts = useCart();
  const [subTotal, setSubTotal] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSubTotal(
      Carts.reduce((prev, cur) => {
        return prev + cur.price * cur.qty;
      }, 0)
    );
  });

  const handleCheckout = () => {
    setIsLoading(true);
    updateCarts(Carts)
      .then(() => navigate("/order-confirmation"))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="sticky top-0 right-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="flex justify-between items-center my-5">
        <p className="text-lg font-semibold">{`Sub Total : ${rupiah(
          subTotal
        )}`}</p>
        <button
          className={`btn btn-primary ${isLoading && "loading normal-case"}`}
          disabled={!Carts.length || isLoading}
          onClick={handleCheckout}
        >
          {isLoading ? "please wait..." : "checkout"}
        </button>
      </div>
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr>
                <th></th>
                <th>Gambar</th>
                <th>Barang</th>
                <th>Harga</th>
                <th>qty</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Carts.length ? (
                Carts.map((cart, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <div>
                          <img
                            src={cart.image_url}
                            className="w-12 aspect-square mx-auto"
                          />
                        </div>
                      </td>
                      <td>{cart.name}</td>
                      <td>{cart.price}</td>
                      <td>
                        <div className="flex gap-1 justify-center">
                          <button
                            onClick={() => dispatch(addItem(cart))}
                            className="w-10 text-white flex justify-center items-center bg-black aspect-square"
                          >
                            +
                          </button>
                          <span className="w-10 flex justify-center items-center aspect-square">
                            {cart.qty}
                          </span>
                          <button
                            onClick={() => dispatch(removeItem(cart.product))}
                            className="w-10 text-white flex justify-center items-center bg-black aspect-square"
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td>
                        <TrashIcon
                          className="w-5 text-red-600 cursor-pointer"
                          onClick={() => dispatch(cleartItem(cart.product))}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} align="center">
                    Tidak ada item.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
