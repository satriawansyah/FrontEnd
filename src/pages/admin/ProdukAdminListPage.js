import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { findAllProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const ProdukAdminListPage = () => {
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

  const namaBodyTemplate = (row) => {
    return (
      <Link to={`/admin/produk/detail/${row.id}`} className="cell-link">
        {row.nama}
      </Link>
    );
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const hargaBarang = (row) => {
    return formatRupiah(row.harga);
  };

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Produk</h2>
              <div>
                <Link to="/admin/produk/create" style={{ textDecoration: "none" }}>
                  <Button label="Tambah" icon="pi pi-plus" />
                </Link>
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable value={produks} size="small" stripedRows className="table-view">
                  <Column field="nama" header="Nama Produk" body={namaBodyTemplate} />
                  <Column field="kategori.nama" header="Kategori" />
                  <Column field="harga" header="Harga" style={{ width: "100px" }} body={hargaBarang} />
                  <Column field="stok" header="Stok" style={{ width: "100px" }} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default ProdukAdminListPage;
