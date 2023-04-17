import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProdukById, findProdukById } from "../../services/ProdukService";
import { ProgressBar } from "primereact/progressbar";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { APP_BASE_URL } from "../../configs/constants";

const PesananUserDetailPage = () => {
  const [produk, setProduk] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [delDialog, setDelDialog] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await deleteProdukById(id);
      navigate("/admin/produk", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
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
                <h2>Detail Produk {produk.nama}</h2>
                <div>
                  <Link to="/admin/produk" style={{ textDecoration: "none" }}>
                    <Button label="Kembali" icon="pi pi-chevron-left" className="mr-2" />
                  </Link>

                  <Link to={`/admin/produk/edit/${produk.id}`} style={{ textDecoration: "none" }}>
                    <Button label="Edit" icon="pi pi-pencil" className="mr-4" />
                  </Link>

                  <Button icon="pi pi-trash" label="Hapus" className="p-button-danger" onClick={() => setDelDialog(true)} />
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
                        <div className="col-fixed detail-label">Deskripsi</div>
                        <div className="col">{produk.deskripsi}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Harga</div>
                        <div className="col">{produk.harga}</div>
                      </div>
                      <div className="grid">
                        <div className="col-fixed detail-label">Stok</div>
                        <div className="col">{produk.stok}</div>
                      </div>
                    </div>
                    <div className="flex-none">
                      <div className="image-display-wrapper">{img ? <img src={img} alt="Gambar Produk" className="image-display" /> : <i className="icon-display pi pi-image"></i>}</div>
                    </div>
                  </div>
                </div>
              </div>

              <ConfirmDialog visible={delDialog} onHide={() => setDelDialog(false)} message="Apakah anda yakin akan menghapus data ini?" header="Konfirmasi" icon="pi pi-exclamation-triangle" accept={handleDelete} />
            </div>
          </div>
        </div>
      )}
    </MainPage>
  );
};

export default PesananUserDetailPage;
