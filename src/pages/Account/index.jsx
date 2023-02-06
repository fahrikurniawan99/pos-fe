import { Bars3Icon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../app/api/auth";
import { USER_LOGOUT } from "../../app/features/auth/constants";
import Navbar from "../../components/Navbar";
import NotAuth from "../../components/NotAuth";

export default function Account() {
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const handleLogout = () => {
    const confirm = window.confirm("Yakin ingin logout?");
    if (confirm)
      return logout()
        .then(() => {
          localStorage.removeItem("auth");
          localStorage.removeItem("cart");
          window.location.reload();
          dispatch(USER_LOGOUT());
        })
        .catch((err) => console.log(err));
  };

  if (!auth) return <NotAuth />;

  return (
    <div className="max-w-6xl mx-auto px-5">
      <div className="sticky top-0 right-0 left-0 z-10 flex justify-between">
        <Navbar />
        <Bars3Icon
          className="w-8 cursor-pointer md:hidden"
          onClick={() => setisOpen(true)}
        />
      </div>

      <h2 className="font-bold text-3xl text-gray-900 mb-4 mt-4">Account</h2>

      <div className="flex">
        <div
          className={`md:w-1/5 top-0 flex justify-center items-center flex-col md:static fixed bg-white z-30 left-0 right-0 w-screen h-screen gap-y-5 md:gap-y-0 md:justify-start md:items-start ${
            isOpen ? "translate-x-0" : "translate-x-96"
          } md:translate-x-0 md:-z-0 transition-all duration-300`}
        >
          <button
            onClick={() => setisOpen(false)}
            className="btn btn-ghost absolute top-3 right-1 md:hidden"
          >
            close
          </button>
          {menuItem.map((menu, i) => (
            <NavLink
              onClick={() => setisOpen(false)}
              key={i}
              className={({ isActive }) =>
                `p-3 border-b-4 md:border-b-0 md:border-l-4 text-xl md:text-base ${
                  isActive ? "border-indigo-600" : "border-transparent"
                }`
              }
              to={menu.path}
            >
              {menu.label}
            </NavLink>
          ))}
          <button
            className={`p-3 text-xl md:text-base text-red-600`}
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
        <div className="w-full md:w-4/5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const menuItem = [
  {
    label: "Profile",
    path: "/account/profile",
  },
  {
    label: "Orders",
    path: "/account/orders",
  },
  {
    label: "Address",
    path: "/account/address",
  },
];
