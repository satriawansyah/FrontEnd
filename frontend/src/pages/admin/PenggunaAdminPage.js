import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { findAllPengguna } from "../../services/PenggunaService";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const PenggunaAdminPage = () => {
  const [penggunas, setPenggunas] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await findAllPengguna();
        setPenggunas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  const namaPengguna = (row) => {
    return (
      <Link to={`/admin/pengguna/detail/${row.id}`} className="cell-link">
        {row.nama}
      </Link>
    );
  };

  const statusPengguna = (rowData) => {
    const status = rowData.isAktif;
    if (status === true) {
      return <div>Aktif</div>;
    } else {
      return <div>Tidak Aktif</div>;
    }
  };

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Pengguna</h2>
              <div>
                <Link to="/admin/pengguna/create" style={{ textDecoration: "none" }}>
                  <Button label="Tambah" icon="pi pi-plus" />
                </Link>
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable value={penggunas} size="small" stripedRows className="table-view">
                  <Column field="nama" header="Nama Pengguna" body={namaPengguna} />
                  <Column field="alamat" header="Alamat" style={{ width: "100px" }} />
                  <Column field="email" header="Email" style={{ width: "100px" }} />
                  <Column field="hp" header="No Hp" style={{ width: "100px" }} />
                  <Column field="roles" header="Role" style={{ width: "100px" }} />
                  <Column field="isAktif" header="Status" style={{ width: "100px" }} body={statusPengguna} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default PenggunaAdminPage;
