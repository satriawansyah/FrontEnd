import api from "./api";

export const getPesananItemsByPesananId = async (pesananId) => {
  return await api.get(`//api/pesananItems/${pesananId}`);
};
