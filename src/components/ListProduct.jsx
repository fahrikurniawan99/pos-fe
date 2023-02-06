import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../app/api/product";
import { useAuth } from "../app/features/auth/reducer";
import { addItem } from "../app/features/cart/actions";
import { fetchProduct, setCurrentPage } from "../app/features/product/actions";
import { useProduct } from "../app/features/product/reducer";
import CardProduct from "./CardProduct";
import Pagination from "./Pagination";
import ProductPlaceholder from "./ProductPlaceholder";

export default function ListProduct() {
  const {
    data: products,
    currentPage,
    totalPage,
    category,
    tags,
    keyword,
  } = useProduct();
  const dispatch = useDispatch();
  const { token } = useAuth();

  const handleAddItem = (item) => {
    if (!token) return alert("Silahkan login terlebih dahulu!");
    dispatch(addItem(item));
  };

  useEffect(() => {
    const tagsParam = tags.reduce((prev, curent) => {
      return prev + `&tags=${curent}`;
    }, "");
    dispatch(fetchProduct(`category=${category}${tagsParam}`));
  }, [dispatch, currentPage, category, tags, keyword]);
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-5">
        {products ? (
          products.length ? (
            products.map((product, index) => (
              <CardProduct
                key={index}
                {...product}
                addItem={() => handleAddItem(product)}
              />
            ))
          ) : (
            <div>Maaf product tidak tersedia.</div>
          )
        ) : (
          Array.from({ length: 8 }).map((data, index) => (
            <ProductPlaceholder key={index} />
          ))
        )}
      </div>
      <Pagination
        pageCount={totalPage}
        currentPage={(page) => dispatch(setCurrentPage(page))}
      />
    </>
  );
}
