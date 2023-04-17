import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { useParams } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
// import { APP_BASE_URL } from "../../configs/constants";
import { getPesananItemsByPesananId } from "../../services/PesananItemService";
import { findPesananById } from "../../services/PesananService";
import { getResiByPesananId } from "../../services/ResiService";

const PesananDetailUserPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // const [img, setImg] = useState("");

  const [pesanan, setPesanan] = useState([]);
  const [pesananItems, setPesananItem] = useState([]);
  const [resis, setResi] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getPesananItemsByPesananId(id);
        const respons = await findPesananById(id);
        const res = await getResiByPesananId(id);
        setPesananItem(response.data);
        setPesanan(respons.data);
        setResi(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    load();
    // eslint-disable-next-line
  }, [id]);

  // const user = JSON.parse(localStorage.getItem("user"));

  // const fetchImage = async (gambar) => {
  //   const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });

  //   const imageBlob = await res.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);
  //   setImg(imageObjectURL);
  // };

  // useEffect(() => {
  //   if (pesananItems.length > 0) {
  //     const pesananItems = pesananItems.map((pesananItem) => pesananItem.produk.gambar);
  //     pesananItems.forEach((gambar) => {
  //       if (gambar) {
  //         fetchImage(gambar);
  //       }
  //     });
  //   }
  // }, [pesananItems]);

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
                <h2>Nomor Pesanan {pesanan.nomor}</h2>
                <div>
                  <Link to="/user/pesanan" style={{ textDecoration: "none" }}>
                    <Button label="Kembali" icon="pi pi-chevron-left" className="mr-2" />
                  </Link>
                </div>
              </div>
              <div className="content-body">
                <div className="content-detail shadow-1">
                  <div className="">
                    <div className="flex">
                      <div className="flex-grow-1">
                        <div className="grid">
                          <div className="col-fixed detail-label">Nama</div>
                          <div className="col">{pesanan.namaPenerima}</div>
                        </div>
                        <div className="grid">
                          <div className="col-fixed detail-label">No Telepon</div>
                          <div className="col">{pesanan.telpPenerima}</div>
                        </div>
                        <div className="grid">
                          <div className="col-fixed detail-label">ِAlamat</div>
                          <div className="col">{pesanan.alamatPengiriman}</div>
                        </div>
                        {resis.map((resi, index) => (
                          <div key={index} className="grid">
                            <div className="col-fixed detail-label">Ekspedisi</div>
                            <div className="col">
                              {resi.ekspedisi.nama} - {resi.noResi}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="produkList">
                    <h3>List Produk</h3>
                    {pesananItems.map((pesananItem, index) => (
                      <div key={index} className="content-detail shadow-1 produks">
                        <div className="flex">
                          <div className="flex-grow-1">
                            <div className="grid">
                              <div className="col-fixed detail-label">Nama Produk</div>
                              <div className="col">{pesananItem.produk.nama}</div>
                            </div>
                            {/* <div className="grid">
                          <div className="col-fixed detail-label">Kategori</div>
                          <div className="col">{pesananItem.produk.kategori.nama}</div>
                        </div>
                        <div className="grid">
                          <div className="col-fixed detail-label">Deskripsi</div>
                          <div className="col">{pesananItem.deskripsi}</div>
                        </div> */}
                            <div className="grid">
                              <div className="col-fixed detail-label">Harga</div>
                              <div className="col">{formatRupiah(pesananItem.harga)}</div>
                            </div>
                            <div className="grid">
                              <div className="col-fixed detail-label">Kuantitas</div>
                              <div className="col">{pesananItem.kuantitas}</div>
                            </div>
                            <div className="grid">
                              <div className="col-fixed detail-label">Total</div>
                              <div className="col">{formatRupiah(pesananItem.jumlah)}</div>
                            </div>
                            {/* <div className="grid">
                          <div className="col-fixed detail-label">Gambar</div>
                          <div className="col">{pesananItem.produk.gambar}</div>
                        </div> */}
                          </div>
                          {/* <div className="flex-none">
                        <div className="image-display-wrapper">
                          <img
                            src={img}
                            alt={pesananItem.produk.gambar}
                            className="image-display"
                            onLoad={() => {
                              if (pesananItem.produk.gambar) {
                                fetchImage(pesananItem.produk.gambar);
                              }
                            }}
                          />
                        </div>
                      </div> */}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="">
                    <div className="flex">
                      <div className="flex-grow-1">
                        <div className="grid">
                          <div className="col-fixed detail-label">Jumlah</div>
                          <div className="col">{formatRupiah(pesanan.jumlah)}</div>
                        </div>
                        <div className="grid">
                          <div className="col-fixed detail-label">Ongkir</div>
                          <div className="col">{formatRupiah(pesanan.ongkir)}</div>
                        </div>
                        <div className="grid">
                          <div className="col-fixed detail-label">Total Harga</div>
                          <div className="col">{formatRupiah(pesanan.total)}</div>
                        </div>
                        {/* <div className="grid">
                        <div className="col-fixed detail-label">Harga</div>
                        <div className="col">{formatRupiah(pesananItem.jumlah)}</div>
                      </div> */}
                      </div>
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

export default PesananDetailUserPage;
