import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import { rupiah } from "../utils";

export default function CardProduct({
  image_url,
  name,
  tags,
  category,
  price,
  addItem
}) {

  return (
    <div className="w-full card border h-[25rem] bg-base-100">
      <figure className="h-1/2">
        <img src={image_url} alt="product" style={{ width: "50%" }} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3 className="text-zinc-500">{category.name}</h3>
        <div className="flex gap-x-1">
          {tags.map((tag, index) => (
            <span key={index} className="badge badge-outline">
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex items-center text-xl font-bold mt-auto">
          <p>{rupiah(price)}</p>
          <button
            onClick={addItem}
            className="btn btn-square bg-black gap-2"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
