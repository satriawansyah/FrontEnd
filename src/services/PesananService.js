import api from "./api";

export const createPesanan = async (pesananRequest) => {
  return await api.post("/api/pesanans", pesananRequest);
};

export const cancelPesanan = async (pesananId) => {
  return await api.patch(`/api/pesanans/${pesananId}/cancel`);
};

export const terimaPesanan = async (pesananId) => {
  return await api.patch(`/api/pesanans/${pesananId}/terima`);
};

export const konfirmasiPembayaran = async (pesananId) => {
  return await api.patch(`/api/pesanans/${pesananId}/konfirmasi`);
};

export const packingPesanan = async (pesananId) => {
  return await api.patch(`/api/pesanans/${pesananId}/packing`);
};

export const kirimPesanan = async (pesananId) => {
  return await api.patch(`/api/pesanans/${pesananId}/kirim`);
};

// export const getPesananByUser = async (page, limit) => {
//   return await api.get(`/api/pesanans?page=${page}&limit=${limit}`);
// };

// export const searchPesanan = async (filterText, page, limit) => {
//   return await api.get(`/api/pesanans/admin?filterText=${filterText}&page=${page}&limit=${limit}`);
// };

export const getAllPesananAdmin = async () => {
  return await api.get(`/api/pesanans/admin`);
};

export const getAllPesananUser = async () => {
  return await api.get(`/api/pesanans`);
};

export const findPesananById = async (id) => {
  return await api.get(`/api/pesanans/${id}`);
};
