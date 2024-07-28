import axiosInstance from "./axiosInstance";

export const fetchLocations = async () => {
  try {
    const response = await axiosInstance.get("/locations");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération du secteur d'activité : ",
      message
    );
    throw error;
  }
};

export const newLocation = async (newLocation) => {
  try {
    const response = await axiosInstance.post("/locations", newLocation);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la création de la ville : ", message);
    throw error;
  }
};

export const deleteLocation = async (locationId) => {
  try {
    const response = await axiosInstance.delete(`/locations/${locationId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la suppression de la ville : ", message);
    throw error;
  }
};

export const updateLocation = async (locationId, updatedLocationData) => {
  try {
    const response = await axiosInstance.patch(
      `/locations/${locationId}`,
      updatedLocationData
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la mise à jour de la ville : ", message);
    throw error;
  }
};
