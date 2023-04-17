import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { useNavigate } from "react-router-dom";
import { findAllKategori } from "../../services/KategoriService";
import { createProduk } from "../../services/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { APP_BASE_URL } from "../../configs/constants";

const ProdukAdminCreatePage = () => {
  const [produk, setProduk] = useState();
  const [, setKategoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submited, setSubmited] = useState(false);
  const navigate = useNavigate();

  const [img, setImg] = useState();

  useEffect(() => {
    const loadKategori = async () => {
      try {
        const response = await findAllKategori();
        setKategoris(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadKategori();

    const emptyProduk = {
      id: null,
      nama: "",
      gambar: "",
      kategori: {
        id: null,
      },
      deskripsi: "",
      stok: 0,
      harga: 0,
    };

    setProduk(emptyProduk);
    setLoading(false);
  }, []);

  const saveProduk = async () => {
    try {
      setSubmited(true);
      const response = await createProduk(produk);
      const _produk = response.data;
      navigate(`/admin/produk/detail/${_produk.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onUpload = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setImg(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _produk = produk;
    _produk.gambar = response.fileName;
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const onBeforeSend = async (event) => {
    if (user && user.token) {
      event.xhr.setRequestHeader("Authorization", "Bearer " + user.token);
    }
  };

  return (
    <MainPage>
      {loading ? (
        <ProgressBar mode="indeterminate" className="my-progress-bar" />
      ) : (
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Checkout</h2>
              </div>
              <div className="content-body"></div>
              <div className="content-fore shadow-1">
                <div className="flex">
                  <div className="flex-grow-1">
                    <div className="p-fluid mb-4">
                      <div className="p-fillled mb-3">
                        <label htmlFor="nama" className="form-label">
                          Nama Penerima
                        </label>
                        <InputText
                          value={produk.nama}
                          placeholder="Masukkan Nama Penerima"
                          id="nama"
                          onChange={(e) => {
                            const val = (e.target && e.target.value) || "";
                            const _produk = { ...produk };
                            _produk.nama = val;
                            setProduk(_produk);
                          }}
                        />
                        {submited && !produk.nama && <span className="p-error">Nama Penerima tidak boleh kosong</span>}
                      </div>
                      <div className="p-field mb-3">
                        <label htmlFor="kategori" className="form-label">
                          Alamat Lengkap
                        </label>
                        <InputText
                          value={produk.nama}
                          placeholder="Masukkan Nama Penerima"
                          id="nama"
                          onChange={(e) => {
                            const val = (e.target && e.target.value) || "";
                            const _produk = { ...produk };
                            _produk.nama = val;
                            setProduk(_produk);
                          }}
                        />
                        {submited && !produk.kategori && <span className="p-error">Alamat Tidak Boleh Kosong</span>}
                      </div>

                      <div className="p-fillled mb-3">
                        <label htmlFor="desskripsi" className="form-label">
                          No Telepon
                        </label>
                        <InputText
                          value={produk.deskripsi}
                          placeholder="ketik deskripsi produk"
                          id="deskripsi"
                          onChange={(e) => {
                            const val = (e.target && e.target.value) || "";
                            const _produk = { ...produk };
                            _produk.deskripsi = val;
                            setProduk(_produk);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <Button label="Gasskeun" icon="pi pi-check" onClick={saveProduk} />
                    </div>
                  </div>
                  <div className="flex-none ml-6 mt-4" style={{ textAlign: "center" }}>
                    <div className="image-display-wrapper">{img ? <img src={img} alt="Gambar Produk" className="image-display" /> : <i className="icon-display pi pi-image"></i>}</div>
                    <FileUpload name="file" url={`${APP_BASE_URL}/api/uploadImage`} auto accept="image/*" onUpload={onUpload} onBeforeSend={onBeforeSend} chooseLabel="Pilih Gambar" mode="basic" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainPage>
  );
};

export default ProdukAdminCreatePage;
