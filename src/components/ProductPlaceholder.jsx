import React from "react";

export default function ProductPlaceholder({}) {
  return (
    <div className="w-full card border h-[25rem] bg-base-100">
      <figure className="h-1/2">
        <div className="bg-zinc-300 w-full h-full animate-pulse"></div>
      </figure>
      <div className="card-body">
        <h2 className="card-title w-48 h-5 bg-zinc-300 animate-pulse rounded-full"></h2>
        <h3 className="bg-zinc-300 animate-pulse w-20 h-3 rounded-full"></h3>
        <div className="flex gap-x-1">
          <span className="badge w-14 bg-zinc-300 border-none animate-pulse"></span>
        </div>
        <div className="flex items-center text-xl font-bold mt-auto justify-between">
          <div className="w-20 h-5 animate-pulse rounded-full inline-block bg-zinc-200"></div>
          <button className="btn btn-square border-none bg-zinc-300 gap-2 animate-pulse"></button>
        </div>
      </div>
    </div>
  );
}
