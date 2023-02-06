import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDeliveryAddress } from "../../app/api/address";
import { getCarts } from "../../app/api/cart";
import { config } from "../../app/config";
import { useAuth } from "../../app/features/auth/reducer";
import { rupiah } from "../../utils";

const OrderConfirmation = () => {
  const [deliveryAddresses, setDeliveryAddresses] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [carts, setCarts] = useState();
  const { token } = useAuth();
  const DELIVERY_FEE = 20000;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate("/");
  }, [token]);

  useEffect(() => {
    carts &&
      setSubTotal(
        carts.reduce((prev, cur) => {
          return prev + cur.price * cur.qty;
        }, 0)
      );
  }, [carts]);

  useEffect(() => {
    getDeliveryAddress()
      .then((res) => {
        setDeliveryAddresses(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getCarts()
      .then((res) => {
        setCarts(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const paymentHandler = async () => {
    setIsLoading(true);
    axios
      .post(
        `${config.apiBaseURL}/api/orders`,
        {
          delivery_fee: DELIVERY_FEE,
          delivery_address: selectedAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        localStorage.removeItem("cart");
        window.location.href = "/invoice/" + res.data._id;
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (carts && !carts.length) return navigate("/");
  }, [carts]);

  return (
    <div className="max-w-6xl px-5 mx-auto mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Konfirmasi Pesanan</h1>
        <button
          disabled={!selectedAddress || isLoading}
          className={`btn btn-primary ${isLoading && "loading"}`}
          onClick={paymentHandler}
        >
          {isLoading ? "please wait..." : "Bayar"}
        </button>
      </div>
      <div className="w-full mt-5">
        <div className="overflow-x-auto">
          <table className="w-full table">
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {deliveryAddresses ? (
                deliveryAddresses.length ? (
                  deliveryAddresses.map((address, i) => (
                    <tr key={i}>
                      <th className="w-28">
                        <div>
                          <input
                            type={"radio"}
                            className="radio radio-primary"
                            name="address"
                            onChange={() => setSelectedAddress(address)}
                          />
                        </div>
                      </th>
                      <td className="w-56">{address.name}</td>
                      <td>
                        {`${address.detail} ${address.kelurahan} ${address.kecamatan} ${address.kabupaten} ${address.provinsi}`}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} align="center">
                      <Link
                        to={"/account/address/create"}
                        className="btn btn-primary"
                      >
                        Tambah Alamat
                      </Link>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={3} align="center">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t pt-3">
          <h2 className="mb-2">Detail pesanan</h2>
          <div className="flex flex-wrap">
            <div className="w-1/2 p-3 after:content-['*'] after:text-red-600 after:ml-1">
              Alamat
            </div>
            <div className="w-1/2 p-3">
              {selectedAddress ? (
                `${selectedAddress.detail} ${selectedAddress.kelurahan} ${selectedAddress.kecamatan} ${selectedAddress.kabupaten} ${selectedAddress.provinsi}`
              ) : (
                <span>Pilih alamat terlebih dahulu</span>
              )}
            </div>
            <div className="w-1/2 p-3">Sub Total</div>
            <div className="w-1/2 p-3">{rupiah(subTotal)}</div>
            <div className="w-1/2 p-3">Ongkir</div>
            <div className="w-1/2 p-3">{rupiah(DELIVERY_FEE)}</div>
            <div className="w-1/2 p-3 font-semibold">Total</div>
            <div className="w-1/2 p-3 font-semibold">
              {rupiah(DELIVERY_FEE + subTotal)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
