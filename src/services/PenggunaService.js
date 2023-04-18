import api from "./api";

export const findAllPengguna = async () => {
  return await api.get("//api/penggunas");
};

export const findPenggunaById = async (id) => {
  return await api.get(`//api/penggunas/${id}`);
};

export const createPengguna = async (pengguna) => {
  return await api.post("//api/penggunas", pengguna);
};

export const updatePengguna = async (pengguna) => {
  return await api.put("//api/penggunas", pengguna);
};

export const deletePenggunaById = async (id) => {
  return await api.delete(`//api/penggunas/${id}`);
};
