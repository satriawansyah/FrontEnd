import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { createEkspedisi, deleteEkspedisiById, findAllEkspedisi, updateEkspedisi } from "../../services/EkspedisiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const EkspedisiAdminPage = () => {
  const [ekspedisis, setEkspedisis] = useState([]);
  const [ekspedisiDialog, setEkspedisiDialog] = useState(false);
  const [deleteEkspedisiDialog, setDeleteEkspedisiDialog] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [insertMode, setInsertMode] = useState(false);

  const emptyEkspedisi = {
    id: null,
    nama: "",
  };

  const [ekspedisi, setEkspedisi] = useState(emptyEkspedisi);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const response = await findAllEkspedisi();
      setEkspedisis(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openNew = () => {
    setEkspedisi(emptyEkspedisi);
    setInsertMode(true);
    setEkspedisiDialog(true);
    setSubmited(false);
  };

  const hideDialog = () => {
    setEkspedisiDialog(false);
    setSubmited(false);
  };

  const hideDeleteDialog = () => {
    setDeleteEkspedisiDialog(false);
  };

  const editEkspedisi = (ekspedisi) => {
    setInsertMode(false);
    setSubmited(false);
    setEkspedisi({ ...ekspedisi });
    setEkspedisiDialog(true);
  };

  const confirmDeleteEkspedisi = (ekspedisi) => {
    setEkspedisi(ekspedisi);
    setDeleteEkspedisiDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-plain p-mr-2" onClick={() => editEkspedisi(rowData)} />

        <Button icon="pi pi-times" className="p-button-rounded p-button-text p-button-plain" onClick={() => confirmDeleteEkspedisi(rowData)} />
      </React.Fragment>
    );
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < ekspedisis.length; i++) {
      if (ekspedisis[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const saveEkspedisi = async () => {
    try {
      setSubmited(true);
      if (ekspedisi.nama.trim()) {
        if (insertMode) {
          const response = await createEkspedisi(ekspedisi);
          const data = response.data;
          const _ekspedisis = [...ekspedisis];
          _ekspedisis.push(data);
          setEkspedisis(_ekspedisis);
        } else {
          const response = await updateEkspedisi(ekspedisi);
          const data = response.data;
          const _ekspedisis = [...ekspedisis];
          const index = findIndexById(data.id);
          _ekspedisis[index] = data;
          setEkspedisis(_ekspedisis);
        }

        setInsertMode(false);
        setEkspedisiDialog(false);
        setEkspedisi(emptyEkspedisi);
        setSubmited(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEkspedisi = async () => {
    try {
      await deleteEkspedisiById(ekspedisi.id);
      let _ekspedisis = ekspedisis.filter((val) => val.id !== ekspedisi.id);
      setEkspedisis(_ekspedisis);
      setDeleteEkspedisiDialog(false);
      setEkspedisi(emptyEkspedisi);
    } catch (error) {
      console.error(error);
    }
  };

  const ekspedisiDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Simpan Ekspedisi" icon="pi pi-check" className="p-button-text" onClick={saveEkspedisi} />
    </React.Fragment>
  );

  const deleteEkspedisiDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
      <Button label="Hapus" icon="pi pi-check" className="p-button-text" onClick={deleteEkspedisi} />
    </React.Fragment>
  );

  return (
    <MainPage>
      <div className="main-content">
        <div className="content">
          <div className="content-inner">
            <div className="content-header">
              <h2>Ekspedisi</h2>
              <div className="p-d-inline">
                <Button label="Tambah" icon="pi pi-plus" className="p-mr-2" onClick={openNew} />
              </div>
            </div>
            <div className="content-body">
              <div className="content-data shadow-1">
                <DataTable value={ekspedisis} size="small" className="table-view" stripedRows>
                  <Column field="nama" header="Nama Ekspedisi"></Column>
                  <Column body={actionBodyTemplate} style={{ width: "120px", textAlign: "right" }}></Column>
                </DataTable>
              </div>
            </div>

            <Dialog visible={ekspedisiDialog} style={{ width: "500px" }} header="Ekspedisi" modal className="p-fluid" onHide={hideDialog} footer={ekspedisiDialogFooter}>
              <div className="p-field">
                <label htmlFor="nama">Nama</label>
                <InputText
                  id="nama"
                  value={ekspedisi.nama}
                  onChange={(e) => {
                    const val = (e.target && e.target.value) || "";
                    const _ekspedisi = { ...ekspedisi };
                    _ekspedisi.nama = val;
                    setEkspedisi(_ekspedisi);
                  }}
                />
                {submited && !ekspedisi.nama && <small className="p-error">Nama harus diisi</small>}
              </div>
            </Dialog>

            <Dialog visible={deleteEkspedisiDialog} style={{ width: "500px" }} header="Konfirmasi" modal footer={deleteEkspedisiDialogFooter} onHide={hideDeleteDialog}>
              <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }}></i>
                {ekspedisi && (
                  <span>
                    Apakah anda yakin akan menghapus ekspedisi <b>{ekspedisi.nama}</b>?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    </MainPage>
  );
};

export default EkspedisiAdminPage;
