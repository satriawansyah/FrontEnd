import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import MainPage from "../../components/MainPage";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
// import moment from "moment";
import { deleteKeranjangById, findKeranjangByPenggunaId } from "../../services/KeranjangService";
import { createPesanan } from "../../services/PesananService";
import { InputText } from "primereact/inputtext";

const ProdukUserListPage = () => {
  const [keranjangs, setKeranjangs] = useState([]);
  const [selectedKeranjangs, setSelectedKeranjangs] = useState([]);
  const [submited, setSubmitted] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await findKeranjangByPenggunaId(user);
        setKeranjangs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [user, refresh]);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Link to={`/user/produk/detail/${rowData.produk.id}`}>
          <Button icon="pi pi-pencil" className="p-button-primary mr-3" />
        </Link>

        <Button icon="pi pi-trash" onClick={() => deleteKeranjangById(rowData.produk.id)} className="p-button-danger mr-2" />
      </React.Fragment>
    );
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  const hitungTotalHarga = () => {
    let totalHarga = 0;
    selectedKeranjangs.forEach((keranjang) => {
      totalHarga += keranjang.harga * keranjang.kuantitas;
    });
    return totalHarga;
  };

  const onNamaChange = (event) => {
    setNamaPenerima(event.target.value);
  };

  const onALamatChange = (event) => {
    setAlamat(event.target.value);
  };

  const onTelpChange = (event) => {
    setNoTelp(event.target.value);
  };

  const [namaPenerima, setNamaPenerima] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");

  const pesanProduk = async () => {
    if (selectedKeranjangs.length === 0) {
      alert("Keranjang belanja masih kosong");
      return;
    }
    if (namaPenerima.length === 0) {
      setSubmitted(true);
      return;
    }
    if (alamat.length === 0) {
      setSubmitted(true);
      return;
    }
    if (noTelp.length === 0) {
      setSubmitted(true);
      return;
    }

    const pesananRequest = {
      ongkir: 0,
      alamatPengiriman: alamat,
      namaPenerima: namaPenerima,
      telpPenerima: noTelp,
      items: selectedKeranjangs.map((keranjang) => ({
        produkId: keranjang.produk.id,
        kuantitas: keranjang.kuantitas,
      })),
    };
    try {
      await createPesanan(pesananRequest);
      // setSubmitted(true);
      // setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const onCheckboxChange = (event, keranjang) => {
    if (event.checked) {
      setSelectedKeranjangs([...selectedKeranjangs, keranjang]);
    } else {
      setSelectedKeranjangs(selectedKeranjangs.filter((k) => k.id !== keranjang.id));
    }
  };

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Produk</h2>
              <div></div>
            </div>

            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable
                  value={keranjangs}
                  size="small"
                  stripedRows
                  className="table-view"
                  selectionMode="multiple"
                  selection={selectedKeranjangs}
                  onSelectionChange={(e) => {
                    setSelectedKeranjangs(e.value);
                  }}
                >
                  <Column
                    selectionMode="multiple"
                    style={{ width: "30px" }}
                    headerStyle={{ width: "30px" }}
                    body={(rowData) => (
                      <div>
                        <input type="checkbox" checked={selectedKeranjangs.some((k) => k.id === rowData.id)} onChange={(e) => onCheckboxChange(e.target, rowData)} />
                      </div>
                    )}
                  />

                  <Column field="produk.nama" header="Nama Produk" />
                  <Column field="kuantitas" header="Kuantitas" />
                  <Column field="harga" header="Harga" style={{ width: "100px" }} />
                  <Column field="jumlah" header="Total" style={{ width: "100px" }} />
                  <Column field="" header="Aksi" style={{ width: "150px" }} body={actionBodyTemplate} />
                </DataTable>
              </div>
            </div>
            <div className="content-footer">
              <div content-header>
                <div className="p-fluid mb-4">
                  <div className="p-fillled mb-3">
                    <label htmlFor="nama" className="form-label">
                      Nama Penerima
                    </label>
                    <InputText value={namaPenerima} placeholder="Masukkan Nama Penerima" id="nama" onChange={onNamaChange} />
                    {submited && !namaPenerima && <span className="p-error">Nama Penerima Tidak Boleh Kosong</span>}
                  </div>
                  <div className="p-field mb-3">
                    <label htmlFor="alamat" className="form-label">
                      Alamat Lengkap
                    </label>
                    <InputText value={alamat} placeholder="Masukkan Alamat Penerima" id="alamat" onChange={onALamatChange} />
                    {submited && !alamat && <span className="p-error">Alamat Tidak Boleh Kosong</span>}
                  </div>

                  <div className="p-fillled mb-3">
                    <label htmlFor="noTelp" className="form-label">
                      No Telepon
                    </label>
                    <InputText type="number" value={noTelp} placeholder="Masukkan Nomor Telepon" id="noTelp" onChange={onTelpChange} />
                    {submited && !noTelp && <span className="p-error">Nomor Telepon Tidak Boleh Kosong</span>}
                  </div>
                </div>
              </div>
              <div className="content-header" style={{ width: "150px", textAlign: "right" }}>
                <h2>Total Pesanan</h2>
              </div>
              <div>
                <tr>
                  <td style={{ width: "150px", textAlign: "right" }}>Total Harga Barang :</td>
                  <td style={{ width: "200px", textAlign: "right" }}>{formatRupiah(hitungTotalHarga())}</td>
                </tr>
                <tr>
                  <td style={{ width: "150px", textAlign: "right" }}>Pengiriman :</td>
                  <td style={{ width: "200px", textAlign: "right" }}>Free</td>
                </tr>
                <tr>
                  <td style={{ width: "150px", textAlign: "right" }}>
                    <strong>Total Bayar :</strong>
                  </td>
                  <td style={{ width: "200px", textAlign: "right" }}>
                    <strong>{formatRupiah(hitungTotalHarga())}</strong>
                  </td>
                </tr>
              </div>
              <Link to={"/user/pesanan"}>
                <Button label="Checkout" icon="pi pi-money-bill" className="btn-bayar" onClick={pesanProduk} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default ProdukUserListPage;
