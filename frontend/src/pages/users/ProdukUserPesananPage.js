import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import QRCode from "qrcode.react";
import Modal from "react-modal";
import { cancelPesanan, getAllPesananUser, terimaPesanan, packingPesanan } from "../../services/PesananService";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const ProdukUserPesananPage = () => {
  const [pesanans, setPesanans] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAllPesananUser();
        setPesanans(response.data.filter((pesanan) => pesanan.statusPesanan !== "SELESAI" && pesanan.statusPesanan !== "DIBATALKAN"));
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [refresh]);

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
      // setQrValue(response.data.id);
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
      alert("ERROR");
    }
  };

  const actionBodyTemplate = (rowData) => {
    const status = rowData.statusPesanan;
    if (status === "PEMBAYARAN") {
      return (
        <div>
          <Button label="PEMBAYARAN" className="p-button-info" onClick={() => handlePay(rowData.id)} />

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
                padding: "15px",
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
      return <Button label="SELESAI" className="p-button-success" onClick={() => handleTerimaPesanan(rowData.id)} />;
    } else {
      return <Button label="BATAL" className="p-button-danger" onClick={() => handleCancelPesanan(rowData.id)} />;
    }
  };

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
              <h2>Pesanan</h2>
            </div>
            <div className="content-body">
              <div className="content-data shadow -1">
                <DataTable value={pesanans} size="small" stripedRows className="table-view">
                  <Column field="nomor" header="Nomor Pesanan" body={nomorPemesanan} />
                  <Column field="namaPenerima" header="Nama" />
                  <Column field="alamatPengiriman" header="Alamat" />
                  <Column field="telpPenerima" header="Telepon" />
                  <Column field="waktuPesan" header="Tanggal" body={tanggalPemesanan} />
                  <Column field="waktuPesan" header="Waktu" body={waktuPemesanan} />
                  {/* <Column field="jumlah" header="harga" body={hargaBarang} />
                  <Column field="ongkir" header="Ongkir" body={hargaOngkir} /> */}
                  <Column field="total" header="Total" body={totalHarga} />
                  <Column field="statusPesanan" header="Status" body={statusPemesanan} />
                  <Column style={{ width: "100px" }} body={actionBodyTemplate} header="Aksi" />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default ProdukUserPesananPage;
