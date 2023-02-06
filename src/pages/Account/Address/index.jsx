import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDeliveryAddress } from "../../../app/api/address";

export default function Address() {
  const [deliveryAddresses, setDeliveryAddresses] = useState(null);

  useEffect(() => {
    getDeliveryAddress()
      .then((res) => {
        setDeliveryAddresses(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-5 items-center">
        <h2 className="text-xl font-semibold">Address</h2>
        <Link to={"/account/address/create"} className="btn btn-primary">
          Tambah alamat
        </Link>
      </div>
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {deliveryAddresses ? (
                deliveryAddresses.length ? (
                  deliveryAddresses.map((address, i) => (
                    <tr key={i}>
                      <td>{address.name}</td>
                      <td className="whitespace-pre-wrap">
                        {`${address.detail} ${address.kelurahan} ${address.kecamatan} ${address.kabupaten} ${address.provinsi}`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center">
                      Tidak ada alamat pengiriman
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={2} className="text-center">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
