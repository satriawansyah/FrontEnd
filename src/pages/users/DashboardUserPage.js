import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { findAllProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import { APP_BASE_URL } from "../../configs/constants";

const ProdukUserListPage = () => {
  const [produks, setProduks] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await findAllProduk();
        setProduks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchImage = async (gambar) => {
    const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
  };

  const ImageBodyTemplate = (row) => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
      const loadImage = async () => {
        const imageSrc = await fetchImage(row.gambar);
        setImageSrc(imageSrc);
      };
      loadImage();
    }, [row.gambar]);
    if (!imageSrc) {
      return <img src={process.env.PUBLIC_URL + "/images/none.jpg"} alt={row.nama} style={{ maxWidth: "100px", maxHeight: "100px" }} />;
    }

    return <img src={imageSrc} alt={row.nama} className="image-display-wrapper" />;
  };

  const namaBodyTemplate = (row) => {
    return (
      <Link to={`/user/produk/detail/${row.id}`} className="cell-link">
        {row.nama}
      </Link>
    );
  };

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Produk</h2>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable value={produks} size="small" stripedRows className="table-view">
                  <Column field="nama + kategori.nama" header="Nama Produk" body={namaBodyTemplate} />

                  <Column field="kategori.nama" header="Kategori" />

                  <Column field="gambar" header="Gambar" align={"center"} body={ImageBodyTemplate} style={{ width: "100px" }} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default ProdukUserListPage;
