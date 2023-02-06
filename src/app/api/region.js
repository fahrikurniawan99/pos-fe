import axios from "axios";

export const getProvinsi = () =>
  new Promise((resolve, reject) =>
    axios("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((res) => resolve(res.data.provinsi))
      .catch((err) => reject(err))
  );

export const getKabupaten = (id) =>
  new Promise((resolve, reject) =>
    axios(
      "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" + id
    )
      .then((res) => resolve(res.data.kota_kabupaten))
      .catch((err) => reject(err))
  );
export const getKecamatan = (id) =>
  new Promise((resolve, reject) =>
    axios(
      "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=" + id
    )
      .then((res) => resolve(res.data.kecamatan))
      .catch((err) => reject(err))
  );
export const getKelurahan = (id) =>
  new Promise((resolve, reject) =>
    axios(
      "https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=" +
        id
    )
      .then((res) => resolve(res.data.kelurahan))
      .catch((err) => reject(err))
  );
