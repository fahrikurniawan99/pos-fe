import { XCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeliveryAddress } from "../../../app/api/address";
import {
  getKabupaten,
  getKecamatan,
  getKelurahan,
  getProvinsi,
} from "../../../app/api/region";

const textItem = ["name", "detail"];

export default function CreateAddress() {
  const [form, setForm] = useState({});
  const [alert, setAlert] = useState(false);
  const [region, setRegion] = useState({
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    getProvinsi()
      .then((res) => {
        setRegion({ ...region, provinsi: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(form).length < 6) {
      return setAlert(true);
    }
    if (Object.values(form).some((value) => value == "")) {
      return setAlert(true);
    }
    setAlert(false);
    const { kecamatan, kabupaten, kelurahan, provinsi } = form;
    const body = {
      ...form,
      kecamatan: JSON.parse(kecamatan).nama,
      kabupaten: JSON.parse(kabupaten).nama,
      kelurahan: JSON.parse(kelurahan).nama,
      provinsi: JSON.parse(provinsi).nama,
    };

    createDeliveryAddress(body)
      .then(() => navigate("/account/address"))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <div className="flex justify-between mb-5 items-center">
        <h2 className="text-xl font-semibold">Address</h2>
        <Link to={"/account/address"} className="btn btn-ghost">
          Batal
        </Link>
      </div>
      <form className="px-3" onSubmit={handleSubmit}>
        <div
          className={`alert alert-error shadow-lg ${
            !alert && "hidden"
          } rounded mb-5 text-white`}
        >
          <div>
            <XCircleIcon className="stroke-current flex-shrink-0 h-6 w-6" />
            <span>Error! Data belum lengkap</span>
          </div>
        </div>
        <div className="lg:flex gap-10">
          <div className="w-full lg:w-1/2">
            {textItem.map((value, index) => (
              <input
                key={index}
                type={"text"}
                name={value}
                placeholder={value}
                value={form[value] ?? ""}
                onChange={handleChange}
                className="input input-bordered w-full mb-3"
              />
            ))}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <select
              name="provinsi"
              value={form["provinsi"] ?? ""}
              className="select select-bordered"
              onChange={(e) => {
                handleChange(e);
                const id = JSON.parse(e.target.value).id;
                getKabupaten(id).then((res) =>
                  setRegion({ ...region, kabupaten: res })
                );
              }}
            >
              <option value="">Pilih Provinsi</option>
              {region.provinsi.map((value, i) => (
                <option key={i} value={JSON.stringify(value)}>
                  {value.nama}
                </option>
              ))}
            </select>

            <select
              name="kabupaten"
              value={form["kabupaten"] ?? ""}
              className="select select-bordered"
              onChange={(e) => {
                handleChange(e);
                const id = JSON.parse(e.target.value).id;
                getKecamatan(id).then((res) =>
                  setRegion({ ...region, kecamatan: res })
                );
              }}
            >
              <option value="">Pilih Kabupaten</option>
              {region.kabupaten.map((value, i) => (
                <option key={i} value={JSON.stringify(value)}>
                  {value.nama}
                </option>
              ))}
            </select>

            <select
              name="kecamatan"
              value={form["kecamatan"] ?? ""}
              className="select select-bordered"
              onChange={(e) => {
                handleChange(e);
                const id = JSON.parse(e.target.value).id;
                getKelurahan(id).then((res) =>
                  setRegion({ ...region, kelurahan: res })
                );
              }}
            >
              <option value="">Pilih Kecamatan</option>
              {region.kecamatan.map((value, i) => (
                <option key={i} value={JSON.stringify(value)}>
                  {value.nama}
                </option>
              ))}
            </select>

            <select
              name="kelurahan"
              value={form["kelurahan"] ?? ""}
              className="select select-bordered"
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option value="">Pilih Kecamatan</option>
              {region.kelurahan.map((value, i) => (
                <option key={i} value={JSON.stringify(value)}>
                  {value.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn btn-primary btn-block mt-5">Tambah</button>
      </form>
    </div>
  );
}
