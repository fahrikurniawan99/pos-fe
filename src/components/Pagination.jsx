import React from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ currentPage, pageCount }) {
  
  const handlePageClick = (event) => {
    currentPage(event.selected);
  };

  return (
    <div className="my-10">
      <ReactPaginate
        pageCount={pageCount}
        activeClassName="w-10 aspect-square flex items-center justify-center bg-zinc-500 text-white"
        containerClassName="flex items-center"
        previousClassName="mr-3"
        nextClassName="ml-3"
        pageClassName="w-10 aspect-square flex items-center justify-center"
        onPageChange={handlePageClick}
      />
    </div>
  );
}
