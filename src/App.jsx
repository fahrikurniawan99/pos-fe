import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Address from "./pages/Account/Address";
import CreateAddress from "./pages/Account/Address/Create";
import Orders from "./pages/Account/Orders";
import Profile from "./pages/Account/Profile";
import OrderConfirmation from "./pages/Confirm";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import ShoppingCart from "./pages/ShoppingCart";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="address" element={<Address />} />
          <Route path="address/create" element={<CreateAddress />} />
        </Route>
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/invoice/:id" element={<Invoice />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
