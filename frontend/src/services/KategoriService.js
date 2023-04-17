import api from "./api";

export const findAllKategori = async () => {
  return await api.get("/api/kategoris");
};

export const createKategori = async (kategori) => {
  return await api.post("/api/kategoris", kategori);
};

export const updateKategori = async (kategori) => {
  return await api.put("/api/kategoris", kategori);
};

export const deleteKategoriById = async (id) => {
  return await api.delete(`/api/kategoris/${id}`);
};
