import React from "react";
import { Link } from "react-router-dom";

export default function NotAuth() {
  return (
    <div className="h-screen flex">
      <div className="m-auto md:w-1/2 text-center flex-col flex">
        <h1 className="text-lg font-bold">Tidak bisa mengakses halaman ini</h1>
        <div className="flex mx-auto">
          <Link
            to={"/signin"}
            className="btn bg-black tetx-white normal-case btn-sm mt-3"
          >
            Sign In
          </Link>
          <Link
            to={"/signup"}
            className="btn btn-ghost tetx-white normal-case btn-sm mt-3"
          >
            Sign Up
          </Link>
        </div>
          <Link to={"/"} className="mt-5 link">home</Link>
      </div>
    </div>
  );
}
