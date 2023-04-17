import api from "./api";

export const findAllProduk = async () => {
  return await api.get("/api/produks");
};

export const findProdukById = async (id) => {
  return await api.get(`/api/produks/${id}`);
};

export const createProduk = async (produk) => {
  return await api.post("/api/produks", produk);
};

export const updateProduk = async (produk) => {
  return await api.put("/api/produks", produk);
};

export const deleteProdukById = async (id) => {
  return await api.delete(`/api/produks/${id}`);
};
