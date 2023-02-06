import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { config } from "../app/config";
import { useAuth } from "../app/features/auth/reducer";
import { rupiah } from "../utils";

export default function Invoice() {
  const params = useParams();
  const { token } = useAuth();
  const [invoice, setInvoice] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getInvoiceById = (invoiceId) => {
      axios
        .get(`${config.apiBaseURL}/api/invoices/${invoiceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setInvoice(res.data))
        .catch((err) => {
          navigate("/");
        });
    };

    getInvoiceById(params.id);
  }, [token, params]);
  return (
    <div className="max-w-6xl mx-auto px-5">
      <h1 className="border-b py-5">Invoice</h1>
      {invoice ? (
        <>
          <div className="w-full flex flex-wrap">
            <div className="w-1/2 p-3">Status</div>
            <div className="w-1/2 p-3">{invoice?.payment_status}</div>

            <div className="w-1/2 p-3">Total amount</div>
            <div className="w-1/2 p-3">{rupiah(invoice?.total)}</div>

            <div className="w-1/2 p-3">Order ID</div>
            <div className="w-1/2 p-3 break-words">{params.id}</div>

            <div className="w-1/2 p-3">Billed to</div>
            <div className="w-1/2 p-3">
              {`${invoice?.delivery_address?.detail} ${invoice?.delivery_address?.kelurahan} ${invoice?.delivery_address?.kecamatan} ${invoice?.delivery_address?.kabupaten} ${invoice?.delivery_address?.provinsi} `}
            </div>

            <div className="w-1/2 p-3">Payment to</div>
            <div className="w-1/2 p-3">eduwork</div>
          </div>
          <div className="text-right">
            <Link to={"/account/orders"} className="btn">
              Done
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full text-center">Loading...</div>
      )}
    </div>
  );
}
