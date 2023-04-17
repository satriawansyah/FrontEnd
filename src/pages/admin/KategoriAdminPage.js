import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { createKategori, deleteKategoriById, findAllKategori, updateKategori } from "../../services/KategoriService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const KategoriAdminPage = () => {

    const [kategoris, setKategoris] = useState([]);
    const [kategoriDialog, setKategoriDialog] = useState(false);
    const [deleteKategoriDialog, setDeleteKategoriDialog] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [insertMode, setInsertMode] = useState(false);

    const emptyKategori = {
        id: null,
        nama: ""
    }

    const [kategori, setKategori] = useState(emptyKategori);

    useEffect(() => {

        load();

    }, []);

    const load = async () => {
        try {
            const response = await findAllKategori();
            setKategoris(response.data);
        } catch (error) {
            console.error(error);
        }
    }



    const openNew = () => {
        setKategori(emptyKategori);
        setInsertMode(true);
        setKategoriDialog(true);
        setSubmited(false);
    }

    const hideDialog = () => {
        setKategoriDialog(false);
        setSubmited(false);
    }

    const hideDeleteDialog = () => {
        setDeleteKategoriDialog(false);
    }

    const editKategori = (kategori) => {
        setInsertMode(false);
        setSubmited(false);
        setKategori({ ...kategori });
        setKategoriDialog(true);
    }

    const confirmDeleteKategori = (kategori) => {
        setKategori(kategori);
        setDeleteKategoriDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-plain p-mr-2"
                    onClick={() => editKategori(rowData)}
                />

                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-text p-button-plain"
                    onClick={() => confirmDeleteKategori(rowData)}
                />
            </React.Fragment>
        )
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < kategoris.length; i++) {
            if (kategoris[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const saveKategori = async () => {
        try {
            setSubmited(true);
            if (kategori.nama.trim()) {
                if (insertMode) {
                    const response = await createKategori(kategori);
                    const data = response.data;
                    const _kategoris = [...kategoris];
                    _kategoris.push(data);
                    setKategoris(_kategoris);
                } else {
                    const response = await updateKategori(kategori);
                    const data = response.data;
                    const _kategoris = [...kategoris];
                    const index = findIndexById(data.id);
                    _kategoris[index] = data;
                    setKategoris(_kategoris);
                }

                setInsertMode(false);
                setKategoriDialog(false);
                setKategori(emptyKategori);
                setSubmited(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteKategori = async () => {
        try {
            await deleteKategoriById(kategori.id);
            let _kategoris = kategoris.filter(val => val.id !== kategori.id);
            setKategoris(_kategoris);
            setDeleteKategoriDialog(false);
            setKategori(emptyKategori);

        } catch (error) {
            console.error(error);
        }
    }

    const kategoriDialogFooter = (
        <React.Fragment>
            <Button label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button label="Simpan Kategori"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveKategori}
            />
        </React.Fragment>
    );

    const deleteKategoriDialogFooter = (
        <React.Fragment>
            <Button label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteDialog}
            />
            <Button label="Hapus"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteKategori}
            />
        </React.Fragment>
    )

    return (
        <MainPage>
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Kategori</h2>
                            <div className="p-d-inline">
                                <Button
                                    label="Tambah"
                                    icon="pi pi-plus"
                                    className="p-mr-2"
                                    onClick={openNew}
                                />
                            </div>
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-1">
                                <DataTable
                                    value={kategoris}
                                    size="small"
                                    className="table-view"
                                    stripedRows>
                                    <Column field="nama" header="Nama Kategori"></Column>
                                    <Column body={actionBodyTemplate}
                                        style={{ width: "120px", textAlign: "right" }}
                                    ></Column>
                                </DataTable>
                            </div>
                        </div>

                        <Dialog visible={kategoriDialog}
                            style={{ width: "500px" }}
                            header="Kategori"
                            modal
                            className="p-fluid"
                            onHide={hideDialog}
                            footer={kategoriDialogFooter}>
                            <div className="p-field">
                                <label htmlFor="nama">Nama</label>
                                <InputText id="nama"
                                    value={kategori.nama}
                                    onChange={(e) => {
                                        const val = (e.target && e.target.value) || '';
                                        const _kategori = { ...kategori };
                                        _kategori.nama = val;
                                        setKategori(_kategori);
                                    }}
                                />
                                {submited && !kategori.nama && <small className="p-error">Nama harus diisi</small>}
                            </div>
                        </Dialog>

                        <Dialog visible={deleteKategoriDialog}
                            style={{ width: "500px" }}
                            header="Konfirmasi"
                            modal
                            footer={deleteKategoriDialogFooter}
                            onHide={hideDeleteDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3"
                                    style={{ fontSize: "2rem" }}
                                ></i>
                                {kategori && <span>Apakah anda yakin akan menghapus kategori <b>{kategori.nama}</b>?</span>}
                            </div>
                        </Dialog>
                    </div>

                </div>
            </div>
        </MainPage>
    )

}

export default KategoriAdminPage;