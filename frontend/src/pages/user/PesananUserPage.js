import React, { useEffect, useState } from "react";
import Profile from "../../components/Profile";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import Modal from "react-modal";
import { cancelPesanan, getAllPesananUser, packingPesanan, terimaPesanan } from "../../services/PesananService";
import { Button } from "primereact/button";

const PesananUserPage = () => {
  const [pesanans, setPesanans] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAllPesananUser();
        const pesanansFiltered = response.data.filter((pesanan) => pesanan.statusPesanan !== "SELESAI" && pesanan.statusPesanan !== "DIBATALKAN");
        setPesanans(pesanansFiltered);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [refresh]);

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
    if (status === "PEMBAYARAN") {
      return <div>Menunggu Pembayaran</div>;
    } else if (status === "PACKING") {
      return <div>Barang sedang di Packing</div>;
    } else if (status === "PENGIRIMAN") {
      return <div>Barang sedang dalam Perjalanan</div>;
    } else {
      return <div>Menunggu Konfirmasi Admin</div>;
    }
  };

  const handleCancelPesanan = async (pesananId) => {
    try {
      const response = await cancelPesanan(pesananId);
      console.log(response.data);
      alert("Pesanan dibatalkan");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      alert("ERROR");
    }
  };

  const handleTerimaPesanan = async (pesananId) => {
    try {
      const response = await terimaPesanan(pesananId);
      console.log(response.data);
      alert("Pesanan telah diterima");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      alert("ERROR");
    }
  };

  const handlePackingPesanan = async (pesananId) => {
    try {
      const response = await packingPesanan(pesananId);
      console.log(response.data);
      setModalIsOpen(false);
      alert("Pesanan sudah dibayar");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      alert("ERROR");
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handlePay = async (pesananId) => {
    try {
      const response = await getAllPesananUser(pesananId);
      console.log(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
      alert("ERROR");
    }
  };

  const actionPesanan = (rowData) => {
    const status = rowData.statusPesanan;
    if (status === "PEMBAYARAN") {
      return (
        <div>
          <Button label="PEMBAYARAN" icon="pi pi-money-bill" className="p-button-info" onClick={() => handlePay(rowData.id)} />

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              content: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                width: "400px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "20px",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#fff",
              },
            }}
          >
            <h4 style={{ marginBottom: "20px", fontSize: "15px" }}>Silahkan scan QR code untuk pembayaran</h4>
            <QRCode value={rowData.id} size={150} />
            <div style={{ marginTop: "20px" }}>
              <Button label="TUTUP" icon="pi pi-times" className="p-button-danger" onClick={() => setModalIsOpen(false)} style={{ marginRight: "20px" }} />
              <Button label="BAYAR" icon="pi pi-dollar" className="p-button-info" onClick={() => handlePackingPesanan(rowData.id)} />
            </div>
          </Modal>
        </div>
      );
    } else if (status === "PACKING") {
      return <div></div>;
    } else if (status === "PENGIRIMAN") {
      return <Button label="SELESAI" icon="pi pi-check-circle" className="p-button-success" onClick={() => handleTerimaPesanan(rowData.id)} />;
    } else {
      return <Button label="BATAL" icon="pi pi-times-circle" className="p-button-danger" onClick={() => handleCancelPesanan(rowData.id)} />;
    }
  };

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
              <h2>Riwayat Pesanan</h2>
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
                  <Column field="aksi" header="Aksi" body={actionPesanan} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  );
};

export default PesananUserPage;
