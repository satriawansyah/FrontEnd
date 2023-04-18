import api from "./api";

export const findAllEkspedisi = async () => {
  return await api.get("//api/ekspedisis");
};

export const createEkspedisi = async (ekspedisi) => {
  return await api.post("//api/ekspedisis", ekspedisi);
};

export const updateEkspedisi = async (ekspedisi) => {
  return await api.put("//api/ekspedisis", ekspedisi);
};

export const deleteEkspedisiById = async (id) => {
  return await api.delete(`//api/ekspedisis/${id}`);
};
