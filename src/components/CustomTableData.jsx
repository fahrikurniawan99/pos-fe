import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { rupiah } from "../utils";

export default function CustomTableData({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <tr>
        <th>
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={(e) => setIsOpen(e.target.checked)}
            />

            <ChevronDownIcon
              className="h-4 cursor-pointer swap-on"
              onClick={() => setIsOpen(!isOpen)}
            />

            <ChevronRightIcon
              className="h-4 cursor-pointer swap-off"
              onClick={() => setIsOpen(!isOpen)}
            />
          </label>
        </th>
        <td>{order.order_number}</td>
        <td>{order.items_count}</td>
        <td>{order.status}</td>
        <td>Invoice</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={5}>
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Barang</th>
                  <th>Jumlah</th>
                  <th>Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map((item, index) => (
                  <tr key={index}>
                    <th></th>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{rupiah(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}
