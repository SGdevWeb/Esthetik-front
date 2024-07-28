import axiosInstance from "./axiosInstance";

export const fetchPackage = async (rateId) => {
  try {
    const response = await axiosInstance.get(`/packages/rate/${rateId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération des données de forfaits : ",
      message
    );
    throw error;
  }
};

export const deletePackage = async (packageId) => {
  try {
    const response = await axiosInstance.delete(`/packages/${packageId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la suppression du forfait : ", message);
    throw error;
  }
};

export const createPackage = async (values) => {
  try {
    const response = await axiosInstance.post("/packages", values);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la création du forfait : ", message);
    throw error;
  }
};

export const updatePackage = async (packageId, updatedPackageData) => {
  try {
    const response = await axiosInstance.patch(
      `/packages/${packageId}`,
      updatedPackageData
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la mise à jour du forfait : ", message);
    throw error;
  }
};
