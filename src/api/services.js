import axiosInstance from "./axiosInstance";

export const fetchServicesByRateId = async (rateId) => {
  try {
    const response = await axiosInstance.get(`/services/${rateId}`);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des prestations", error);
    throw error;
  }
};

export const fetchServicesWithRates = async () => {
  try {
    const response = await axiosInstance.get(`/services/details`);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des prestations", error);
    throw error;
  }
};

export const addService = async (newService) => {
  try {
    const response = await axiosInstance.post(`/services`, newService);
    return response;
  } catch (error) {
    console.error(
      `Erreur lors de l'ajout du nouveau type de prestation : ${error.message}`
    );
    throw error;
  }
};

export const deleteService = async (serviceId) => {
  try {
    const response = await axiosInstance.delete(`/services/${serviceId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la suppression de la prestation : ", message);
    throw error;
  }
};

export const updateService = async (serviceId, updatedServiceData) => {
  try {
    const response = await axiosInstance.patch(
      `/services/${serviceId}`,
      updatedServiceData
    );
    return response;
  } catch (error) {
    console.error(
      `Erreur lors de la modification de la prestation : ${error.message}`
    );
    throw error;
  }
};
