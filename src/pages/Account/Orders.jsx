import React, { useEffect, useState } from "react";
import { getOrders } from "../../app/api/orders";
import { useAuth } from "../../app/features/auth/reducer";
import Pagination from "../../components/Pagination";
import CustomTableData from "../../components/CustomTableData";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const perPage = 5;

  useEffect(() => {
    getOrders(`limit=${perPage}&skip=${page * perPage}`)
      .then((res) => {
        setOrders(res.data);
        setCount(res.count);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      setOrders(null);
    };
  }, [page]);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Orders</h2>
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders ? (
                orders.length ? (
                  orders.map((order, index) => (
                    <CustomTableData order={order} key={index} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Tidak ada histori pembelian
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {count ? (
        <Pagination
          pageCount={Math.ceil((count ? count : 1) / perPage)}
          currentPage={(value) => setPage(value)}
        />
      ) : null}
    </div>
  );
}
