import React, { useEffect, useState } from "react";
import Profile from "../../components/Profile";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { getAllPesananUser } from "../../services/PesananService";

const RiwayatPesananUserPage = () => {
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

  const tanggalPemesanan = (rowData) => {
    const timestampValue = rowData.waktuPesan;
    const dateTime = new Date(timestampValue);
    return <div>{dateTime.toLocaleDateString()}</div>;
  };

  const waktuPemesanan = (rowData) => {
    const timestampValue = rowData.waktuPesan;
    const dateTime = new Date(timestampValue);
    return <div>{dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</div>;
  };

  const statusPemesanan = (rowData) => {
    const status = rowData.statusPesanan;
    // if (status === "PEMBAYARAN") {
    //   return <div>Menunggu Pembayaran</div>;
    // } else if (status === "PACKING") {
    //   return <div>Barang sedang di Packing</div>;
    // } else if (status === "PENGIRIMAN") {
    //   return <div>Barang sedang dalam Perjalanan</div>;
    //   } else
    if (status === "SELESAI") {
      return <div>Barang telah diterima</div>;
    } else if (status === "DIBATALKAN") {
      return <div>Barang telah dibatalkan</div>;
    }
    // else {
    //   return <div>Menunggu Konfirmasi Admin</div>;
    // }
  };

  // const handleCancelPesanan = async (pesananId) => {
  //   try {
  //     const response = await cancelPesanan(pesananId);
  //     console.log(response.data);
  //     alert("Pesanan dibatalkan");
  //   } catch (error) {
  //     console.error(error);
  //     alert("ERROR");
  //   }
  // };

  // const handleTerimaPesanan = async (pesananId) => {
  //   try {
  //     const response = await terimaPesanan(pesananId);
  //     console.log(response.data);
  //     alert("Pesanan telah diterima");
  //   } catch (error) {
  //     console.error(error);
  //     alert("ERROR");
  //   }
  // };

  // const handleKonfirmasiPembayaran = async (pesananId) => {
  //   try {
  //     const response = await konfirmasiPembayaran(pesananId);
  //     console.log(response.data);
  //     alert("Pesanan telah dibayar");
  //   } catch (error) {
  //     console.error(error);
  //     alert("ERROR");
  //   }
  // };

  // const actionPesanan = (rowData) => {
  //   const status = rowData.statusPesanan;
  //   if (status === "PEMBAYARAN") {
  //     return <div></div>;
  //   } else if (status === "PACKING") {
  //     return <div></div>;
  //   } else if (status === "PENGIRIMAN") {
  //     return <button onClick={() => handleTerimaPesanan(rowData.id)}>SELESAI</button>;
  //     // } else if (status === "SELESAI") {
  //     //   return <div>Selesai</div>;
  //     // } else if (status === "DIBATALKAN") {
  //     //   return <div></div>;
  //   } else {
  //     return <button onClick={() => handleCancelPesanan(rowData.id)}>BATAL</button>;
  //   }
  // };

  const detailPesanan = (row) => {
    return (
      <Link to={`/pesanan/detail/${row.id}`} className="cell-link">
        {row.nomor}
      </Link>
    );
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const hargaBarang = (row) => {
    return formatRupiah(row.jumlah);
  };

  const hargaOngkir = (row) => {
    return formatRupiah(row.ongkir);
  };

  const totalHarga = (row) => {
    return formatRupiah(row.total);
  };

  return (
    <Profile>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Pesanan</h2>
            </div>
            <div className="content-body">
              <div className="content-data shadow -1">
                <DataTable value={pesanans} size="small" className="tavle-view" stripedRows>
                  <Column field="nomor" header="Nomor Pesanan" body={detailPesanan} />
                  <Column field="pengguna.nama" header="Nama" />
                  <Column field="alamatPengiriman" header="Alamat" />
                  <Column field="waktuPesan" header="Tanggal" body={tanggalPemesanan} />
                  <Column field="waktuPesan" header="Waktu" body={waktuPemesanan} />
                  <Column field="jumlah" header="Total Produk" body={hargaBarang} />
                  <Column field="ongkir" header="Ongkir" body={hargaOngkir} />
                  <Column field="total" header="Total" body={totalHarga} />
                  <Column field="statusPesanan" header="Status" body={statusPemesanan} />
                  {/* <Column field="aksi" header="Aksi" body={actionPesanan} /> */}
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  );
};

export default RiwayatPesananUserPage;
