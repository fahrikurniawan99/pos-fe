import React, { useState } from "react";
import Filter from "../components/Filter";
import ListProduct from "../components/ListProduct";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-5 relative">
      <div className="sticky top-0 right-0 left-0 z-10">
        <Navbar />
      </div>
      <Filter />
      <div className="mt-10">
        <ListProduct />
      </div>
    </div>
  );
}
