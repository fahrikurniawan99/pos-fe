import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { config } from "../app/config";
import { useAuth } from "../app/features/auth/reducer";
import { clearFilter, setCategory } from "../app/features/product/actions";
import { useProduct } from "../app/features/product/reducer";

export default function FilterCategory() {
  const { token } = useAuth();
  const { category, tags } = useProduct();
  const [categories, setCategories] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios(`${config.apiBaseURL}/api/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex justify-between items-center">
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1 btn-ghost normal-case">
          <AdjustmentsHorizontalIcon className="w-5 mr-1" />
          Category
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu menu-compact bg-base-100 w-56 p-2 rounded-box border"
        >
          {categories &&
            categories.map((value, i) => (
              <li key={i}>
                <a
                  className={`${
                    category === value.name && "bg-indigo-100"
                  } font-medium`}
                  onClick={() => dispatch(setCategory(value.name))}
                >
                  {value.name}
                </a>
              </li>
            ))}
        </ul>
      </div>
      {tags.length || category ? (
        <button
          className="font-semibold btn-xs text-red-600 btn btn-ghost"
          onClick={() => dispatch(clearFilter())}
        >
          clear filter
        </button>
      ) : null}
    </div>
  );
}
