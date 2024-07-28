import axiosInstance from "./axiosInstance";

export const fetchRates = async () => {
  try {
    const response = await axiosInstance.get(`/rates`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération des données de tarifs : ",
      message
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
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération des données de tarifs : ",
      message
    );
    throw error;
  }
};

export const fetchRateIdByName = async (rateName) => {
  try {
    const response = await axiosInstance.get(`/rates/name/${rateName}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération des données de tarifs : ",
      message
    );
    throw error;
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
    const { message } = error.response.data;
    console.error(`Erreur lors de la modification du tarif : ${message}`);
    throw error;
  }
};

export const deleteRate = async (rateId) => {
  try {
    const response = await axiosInstance.delete(`/rates/${rateId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(`Erreur lors de la suppression du tarif : ${message}`);
    throw error;
  }
};

export const addRate = async (newRate) => {
  try {
    const response = await axiosInstance.post(`/rates`, newRate);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(`Erreur lors de l'ajout du tarif : ${message}`);
    throw error;
  }
};
