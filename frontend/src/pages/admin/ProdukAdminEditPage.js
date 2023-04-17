import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { useNavigate, useParams } from "react-router-dom";
import { findAllKategori } from "../../services/KategoriService";
import { findProdukById, updateProduk } from "../../services/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { APP_BASE_URL } from "../../configs/constants";
import { FileUpload } from "primereact/fileupload";

const ProdukAdminEditPage = () => {
  const [produk, setProduk] = useState();
  const [kategoris, setKategoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submited, setSubmited] = useState(false);

  const navigate = useNavigate();

  const [img, setImg] = useState();

  const { id } = useParams();

  useEffect(() => {
    const loadKategori = async () => {
      try {
        const response = await findAllKategori();
        setKategoris(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadKategori();

    const loadProduk = async () => {
      try {
        const response = await findProdukById(id);
        const _produk = response.data;
        setProduk(_produk);
        if (_produk.gambar) {
          fetchImage(_produk.gambar);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduk();
    // eslint-disable-next-line
  }, [id]);

  const saveProduk = async () => {
    try {
      setSubmited(true);
      const response = await updateProduk(produk);
      const _produk = response.data;
      navigate(`/admin/produk/detail/${_produk.id}`, {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchImage = async (gambar) => {
    const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  const onUpload = async (event) => {
    const [file] = event.files;
    const imageObjectURL = URL.createObjectURL(file);
    setImg(imageObjectURL);
    const response = JSON.parse(event.xhr.response);
    const _produk = produk;
    _produk.gambar = response.fileName;
  };

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
                <h2>Edit Produk</h2>
              </div>
              <div className="content-body">
                <div className="content-form shadow-1">
                  <div className="flex">
                    <div className="flex-grow-1">
                      <div className="p-fluid mb-4">
                        <div className="p-filed mb-3">
                          <label htmlFor="nama" className="form-label">
                            Nama
                          </label>
                          <InputText
                            value={produk.nama}
                            placeholder="Ketik nama produk"
                            id="nama"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _produk = { ...produk };
                              _produk.nama = val;
                              setProduk(_produk);
                            }}
                          />
                          {submited && !produk.nama && <span className="p-error">Nama produk tidak boleh kosong</span>}
                        </div>

                        <div className="p-field mb-3">
                          <label htmlFor="kategori" className="form-label">
                            Kategori
                          </label>
                          <Dropdown
                            optionLabel="nama"
                            optionValue="id"
                            id="kategori"
                            value={produk.kategori.id}
                            options={kategoris}
                            placeholder="Pilih kategori"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || null;
                              const _produk = { ...produk };
                              _produk.kategori.id = val;
                              setProduk(_produk);
                            }}
                          />
                          {submited && !produk.kategori.id && <span className="p-error">Kategori produk harus dipilih</span>}
                        </div>

                        <div className="p-filed mb-3">
                          <label htmlFor="deskripsi" className="form-label">
                            Deskripsi
                          </label>
                          <InputTextarea
                            autoResize
                            value={produk.deskripsi}
                            placeholder="Ketik deskripsi produk"
                            id="deskripsi"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _produk = { ...produk };
                              _produk.deskripsi = val;
                              setProduk(_produk);
                            }}
                          />
                        </div>

                        <div className="p-filed mb-3">
                          <label htmlFor="harga" className="form-label">
                            Harga
                          </label>
                          <InputText
                            value={produk.harga}
                            placeholder="Ketik harga produk"
                            id="harga"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _produk = { ...produk };
                              _produk.harga = val;
                              setProduk(_produk);
                            }}
                          />
                          {submited && !produk.harga && <span className="p-error">Harga produk tidak boleh kosong</span>}
                        </div>

                        <div className="p-filed mb-3">
                          <label htmlFor="stok" className="form-label">
                            Stok
                          </label>
                          <InputText
                            value={produk.stok}
                            placeholder="Ketik stok produk"
                            id="stok"
                            onChange={(e) => {
                              const val = (e.target && e.target.value) || "";
                              const _produk = { ...produk };
                              _produk.stok = val;
                              setProduk(_produk);
                            }}
                          />
                          {submited && !produk.stok && <span className="p-error">Stok produk tidak boleh kosong</span>}
                        </div>
                      </div>

                      <div>
                        <Button label="Simpan" icon="pi pi-check" onClick={saveProduk} />
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
        </div>
      )}
    </MainPage>
  );
};

export default ProdukAdminEditPage;
