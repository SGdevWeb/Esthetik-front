import axiosInstance from "./axiosInstance";

export const fetchRates = async () => {
  try {
    const response = await axiosInstance.get(`/rates`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de tarifs : ",
      error
    );
    throw error;
  }
};

export const fetchRateById = async (rateId) => {
  try {
    const response = await axiosInstance.get(`/rates/id/${rateId}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de tarifs");
  }
};

export const fetchRateIdByName = async (rateName) => {
  try {
    const response = await axiosInstance.get(`/rates/name/${rateName}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de tarifs");
  }
};

export const updateRate = async (rateId, updatedRateData) => {
  try {
    const response = await axiosInstance.patch(
      `/rates/${rateId}`,
      updatedRateData
    );
    return response;
  } catch (error) {
    console.error(`Erreur lors de la modification du tarif : ${error.message}`);
    throw error;
  }
};

export const deleteRate = async (rateId) => {
  try {
    const response = await axiosInstance.delete(`/rates/${rateId}`);
    return response;
  } catch (error) {
    console.error(`Erreur lors de la suppression du tarif : ${error.message}`);
    throw error;
  }
};

export const addRate = async (newRate) => {
  try {
    const response = await axiosInstance.post(`/rates`, newRate);
    return response;
  } catch (error) {
    console.error(`Erreur lors de l'ajout du tarif : ${error.message}`);
    throw error;
  }
};
