import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { getAllPesananUser } from "../../services/PesananService";
import { Link } from "react-router-dom";

const ProdukUserRiwayatPage = () => {
  const [pesanans, setPesanans] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAllPesananUser();
        setPesanans(response.data.filter((pesanan) => pesanan.statusPesanan === "SELESAI" || pesanan.statusPesanan === "DIBATALKAN"));
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const nomorPemesanan = (rowData) => {
    return (
      <Link to={`/user/pesanan/detail/${rowData.id}`} className="cell-link">
        {rowData.nomor}
      </Link>
    );
  };

  const tanggalPemesanan = (rowData) => {
    const timestampValue = rowData.waktuPesan;
    const dateTime = new Date(timestampValue);
    return <div>{dateTime.toLocaleDateString()}</div>;
  };

  const waktuPemesanan = (rowData) => {
    const timestampValue = rowData.waktuPesan;
    const dateTime = new Date(timestampValue);
    return (
      <div>
        {dateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
    );
  };

  const statusPemesanan = (rowData) => {
    const status = rowData.statusPesanan;
    if (status === "SELESAI") {
      return <div>Selesai</div>;
    } else if (status === "DIBATALKAN") {
      return <div>Barang DIBATALKAN</div>;
    }
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  // const hargaBarang = (row) => {
  //   return formatRupiah(row.jumlah);
  // };

  // const hargaOngkir = (row) => {
  //   return formatRupiah(row.ongkir);
  // };

  const totalHarga = (row) => {
    return formatRupiah(row.total);
  };

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Riwayat Pesanan</h2>
            </div>
            <div className="content-body">
              <div className="content-data shadow -1">
                <DataTable value={pesanans} size="small" stripedRows className="tavle-view">
                  <Column field="nomor" header="Nomor Pesanan" body={nomorPemesanan} />
                  <Column field="namaPenerima" header="Nama" />
                  <Column field="alamatPengiriman" header="Alamat" />
                  <Column field="telpPenerima" header="Telepon" />
                  <Column field="waktuPesan" header="Tanggal" body={tanggalPemesanan} />
                  <Column field="waktuPesan" header="Waktu" body={waktuPemesanan} />
                  {/* <Column field="jumlah" header="Total Produk" body={hargaBarang} />
                  <Column field="ongkir" header="Ongkir" body={hargaOngkir} /> */}
                  <Column field="total" header="Total" body={totalHarga} />
                  <Column field="statusPesanan" header="Status" body={statusPemesanan} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default ProdukUserRiwayatPage;
