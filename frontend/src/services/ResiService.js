import api from "./api";

export const findAllResi = async () => {
  return await api.get("/api/resis");
};

export const getResiByPesananId = async (pesananId) => {
  return await api.get(`/api/resis/${pesananId}`);
};

export const createResi = async (resi) => {
  return await api.post("/api/resis", resi);
};

export const updateResi = async (resi) => {
  return await api.put("/api/resis", resi);
};

export const deleteResiById = async (id) => {
  return await api.delete(`/api/resis/${id}`);
};
