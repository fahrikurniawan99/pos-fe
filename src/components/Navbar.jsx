import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../app/features/cart/reducer";
import { setKeyword } from "../app/features/product/actions";
import { useProduct } from "../app/features/product/reducer";

export default function Navbar() {
  const carts = useCart();
  const dispatch = useDispatch();
  const { keyword } = useProduct();

  return (
    <div className="py-5 flex items-center justify-between w-full bg-white">
      <Link to="/" className="text-xl">
        POS
      </Link>
      {window.location.pathname === "/" && (
        <div className="w-6/12">
          <input
            value={keyword}
            onChange={(e) => dispatch(setKeyword(e.target.value))}
            type="text"
            className="input w-full h-6 placeholder:text-gray-600 lg:h-10 border-zinc-200"
            placeholder="Search..."
          />
        </div>
      )}
      <div className="flex items-center">
        <Link to={"/cart"} className="indicator mr-2">
          <span className="indicator-item badge badge-secondary">
            {carts.length}
          </span>
          <ShoppingCartIcon className="w-5" />
        </Link>
        <Link
          to={"/account/profile"}
          className="btn btn-ghost btn-circle btn-sm"
        >
          <UserIcon className="w-5" />
        </Link>
      </div>
    </div>
  );
}
