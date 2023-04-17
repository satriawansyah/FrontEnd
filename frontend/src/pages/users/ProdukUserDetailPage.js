import { ProgressBar } from "primereact/progressbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainPage from "../../components/MainPage";

import { Link } from "react-router-dom";
import { Button } from "primereact/button";

import { APP_BASE_URL } from "../../configs/constants";
import { findProdukById } from "../../services/ProdukService";
import { createKeranjang } from "../../services/KeranjangService";

const ProdukUserDetailPage = () => {
  const [produk, setProduk] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [kuantitas, setJumlah] = useState(1);

  const totalHarga = produk ? produk.harga * kuantitas : 0;

  const [img, setImg] = useState();

  useEffect(() => {
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

  const onJumlahChange = (event) => {
    setJumlah(event.target.value);
  };

  const onAddToCartClick = async () => {
    const keranjang = {
      produkId: produk.id,
      kuantitas: kuantitas,
    };

    try {
      await createKeranjang(keranjang);
      alert("Berhasil Memasukkan Produk Ke keranjang!");
    } catch (error) {
      console.error(error);
      alert("Gagal Memasukkan produk ke keranjang.");
    }
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  return (
    <MainPage>
      {loading ? (
        <ProgressBar mode="indeterminate" className="my-progress-bar" />
      ) : (
        <div className="main-content">
          <div className="content">
            <div className="content-inner">
              <div className="content-header">
                <h2>Detail Produk {produk.nama}</h2>
                <div className="margin">
                  <Link to="/user/dashboard" style={{ textDecoration: "none" }}>
                    <Button label="kembali" icon="pi pi-chevron-left" className="mr-2" />
                  </Link>
                  <Link to="/user/dashboard" style={{ textDecoration: "none" }}>
                    <Button icon="pi pi-shopping-cart" label="Masukkan Ke Keranjang" className="p-button-success" onClick={onAddToCartClick} />
                  </Link>

                  <Link to="/user/pesanan" style={{ textDecoration: "none" }}>
                    <Button icon="pi pi-shopping-cart" label="Beli Sekarang !" className="p-button-help" onClick={onAddToCartClick} />
                  </Link>
                </div>
              </div>
              <div className="content-body">
                <div className="content-detail shadow-1">
                  <div className="flex">
                    <div className="flex-grow-1">
                      <div className="grid">
                        <div className="col-fixed detail-label">Nama Produk</div>
                        <div className="col">{produk.nama}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Kategori</div>
                        <div className="col">{produk.kategori.nama}</div>
                      </div>

                      <div className="grid">
                        <div className="col-fixed detail-label">Harga</div>
                        <div className="col">{formatRupiah(produk.harga)}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Stok</div>
                        <div className="col">{produk.stok}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Qty</div>
                        <input type="number" min={1} max={produk.stok} value={kuantitas} onChange={onJumlahChange} style={{ width: "50px", marginLeft: "5px" }} />
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Total Harga</div>
                        <div className="col">Rp {totalHarga.toLocaleString("id-ID")}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Deskripsi</div>
                        <div className="col">
                          {produk.deskripsi.split("\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex-none">
                      <div className="image-display-wrapper">{img ? <img src={img} alt="Gambar Produk" className="image-display" /> : <i className="icon-display pi pi-image"></i>}</div>
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

export default ProdukUserDetailPage;
