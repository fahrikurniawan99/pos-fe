import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { config } from "../app/config";
import { useAuth } from "../app/features/auth/reducer";
import { useProduct } from "../app/features/product/reducer";
import { setTags } from "../app/features/product/actions";

export default function FilterTag() {
  const { token } = useAuth();
  const { category, tags } = useProduct();
  const [alltags, setAllTags] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios(`${config.apiBaseURL}/api/tags?category=${category}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setAllTags(res.data.data))
      .catch((err) => console.log(err));
  }, [token, category]);

  return (
    <div className="flex gap-3 mt-3 flex-wrap">
      {alltags &&
        alltags.map((tag, i) => {
          return (
            <button
              key={i}
                onClick={() => dispatch(setTags(tag.name))}
              className={`badge ${!tags.includes(tag.name) && "badge-outline"}`}
            >
              {tag.name}
            </button>
          );
        })}
    </div>
  );
}
