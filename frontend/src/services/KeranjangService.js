import api from "./api";

export const findKeranjangByPenggunaId = async (user) => {
  return await api.get("/api/keranjangs", user);
};

export const createKeranjang = async (user, keranjang) => {
  return await api.post("/api/keranjangs", user, keranjang);
};

// export const updateKeranjang = async (produkId) => {
//   return await api.patch(`/api/keranjangs/${produkId}`);
// };

export const updateKeranjang = async (produkId, kuantitas) => {
  return await api.patch(`/api/keranjangs/${produkId}?kuantitas=${kuantitas}`);
};

export const deleteKeranjangById = async (id) => {
  return await api.delete(`/api/keranjangs/${id}`);
};
