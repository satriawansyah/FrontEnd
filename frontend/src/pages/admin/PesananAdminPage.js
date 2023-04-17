import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Modal from "react-modal";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { getAllPesananAdmin, kirimPesanan, konfirmasiPembayaran } from "../../services/PesananService";
import { createResi } from "../../services/ResiService";
import { findAllEkspedisi } from "../../services/EkspedisiService";

const PesananAdminPage = () => {
  const [resi, setResi] = useState();
  const [ekspedisi, setEkspedisi] = useState([]);
  const [ekspedisis, setEkspedisis] = useState([]);
  const [pesanans, setPesanans] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleKirim = async (pesananId) => {
    try {
      const response = await getAllPesananAdmin(pesananId);
      console.log(response.data);
      const res = await findAllEkspedisi();
      setEkspedisis(res.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
      alert("ERROR");
    }
  };

  const onNoResiChange = (event) => {
    setResi(event.target.value);
  };

  const saveResi = async (noResi, ekspedisiId, pesananId) => {
    if (!noResi || !ekspedisiId || !pesananId) {
      setSubmited(true);
      return;
    }

    const resiRequest = {
      noResi: noResi,
      ekspedisi: {
        id: ekspedisiId,
      },
      pesanan: {
        id: pesananId,
      },
    };
    try {
      await createResi(resiRequest);
      // setSubmitted(true);
      // setRefresh(!refresh);
      // alert("Resi telah diinputkan");
    } catch (error) {
      console.error(error);
      // alert("Resi Gagal diinputkan");
    }
  };

  const actionPesanan = (rowData) => {
    const status = rowData.statusPesanan;
    if (status === "PEMBAYARAN") {
      return <div></div>;
    } else if (status === "PACKING") {
      return (
        <div>
          <Button label="KIRIM" icon="pi pi-send" className="p-button-primary" onClick={() => handleKirim(rowData.id)} />

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
            <h3 style={{ marginBottom: "20px", fontSize: "15px" }}>Masukkan Data Pengiriman</h3>
            <div className="p-fluid mb-4">
              <div className="p-filled mb-3">
                <label htmlFor="ekspedisi" className="form-label">
                  Nama Ekspedisi
                </label>
                <Dropdown id="ekspedisi" value={ekspedisi} options={ekspedisis} optionLabel="nama" onChange={(e) => setEkspedisi(e.value)} placeholder="Pilih Ekspedisi" />
                {submited && !ekspedisi && <span className="p-error">Ekspedisi Harus Dipilih</span>}
              </div>
              <div className="p-filled mb-3">
                <label htmlFor="noResi" className="form-label">
                  Nomor Resi
                </label>
                <InputText value={resi} placeholder="Masukkan Nomor Resi" id="noResi" onChange={onNoResiChange} />
                {submited && !resi && <span className="p-error">Nomor Resi Tidak Boleh Kosong</span>}
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button label="TUTUP" icon="pi pi-times" className="p-button-danger" onClick={() => setModalIsOpen(false)} style={{ marginRight: "20px" }} />
              <Button label="Kirim" icon="pi pi-send" className="p-button-info" onClick={() => saveResi(resi, ekspedisi.id, rowData.id) && handleKirimPesanan(rowData.id)} />
            </div>
          </Modal>
        </div>
      );
      // return <Button label="KIRIM" icon="pi pi-send" className="p-button-primary" onClick={() => handleKirimPesanan(rowData.id)} />;
    } else if (status === "PENGIRIMAN") {
      return <div></div>;
    } else {
      return (
        <React.Fragment>
          <Button label="KONFIRMASI" icon="pi pi-check" className="p-button-success" onClick={() => handleKonfirmasiPembayaran(rowData.id)} />
          {/* <Button label="BATAL" className="p-button-danger" onClick={() => handleCancelPesanan(rowData.id)} /> */}
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAllPesananAdmin();
        const pesanansFiltered = response.data.filter((pesanan) => pesanan.statusPesanan !== "SELESAI" && pesanan.statusPesanan !== "DIBATALKAN");
        setPesanans(pesanansFiltered);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [refresh]);

  const nomorPemesanan = (rowData) => {
    return (
      <Link to={`/admin/pesanan/detail/${rowData.id}`} className="cell-link">
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
    return <div>{dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</div>;
  };

  const statusPemesanan = (rowData) => {
    const status = rowData.statusPesanan;
    if (status === "PEMBAYARAN") {
      return <div>Menunggu Pembayaran</div>;
    } else if (status === "PACKING") {
      return <div>Barang sedang di Packing</div>;
    } else if (status === "PENGIRIMAN") {
      return <div>Barang sedang Pengiriman</div>;
    } else {
      return <div>DRAFT</div>;
    }
  };

  const handleKonfirmasiPembayaran = async (pesananId) => {
    try {
      const response = await konfirmasiPembayaran(pesananId);
      console.log(response.data);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKirimPesanan = async (pesananId) => {
    try {
      const response = await kirimPesanan(pesananId);
      console.log(response.data);
      alert("Pesanan sedang dikirim");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      alert("ERROR");
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
                <DataTable value={pesanans} size="small" stripedRows className="tavle-view">
                  <Column field="nomor" header="Nomor Pesanan" body={nomorPemesanan} />
                  <Column field="namaPenerima" header="Nama" />
                  <Column field="alamatPengiriman" header="Alamat" />
                  <Column field="telpPenerima" header="Telepon" />
                  <Column field="waktuPesan" header="Tanggal" body={tanggalPemesanan} />
                  <Column field="waktuPesan" header="Waktu" body={waktuPemesanan} />
                  <Column field="total" header="Total" body={totalHarga} />
                  <Column field="statusPesanan" header="Status" body={statusPemesanan} />
                  <Column field="aksi" header="Aksi" body={actionPesanan} />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default PesananAdminPage;
