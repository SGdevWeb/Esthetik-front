import axiosInstance from "./axiosInstance";

export const fetchLocations = async () => {
  try {
    const response = await axiosInstance.get("/locations");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du secteur d'activité : ",
      error
    );
    return error;
  }
};

export const newLocation = async (values) => {
  try {
    const response = await axiosInstance.post("/locations/new", values);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la création de la ville : ", message);
    return error.response;
  }
};

export const deleteLocation = async (locationId) => {
  try {
    const response = await axiosInstance.delete(
      "/locations/delete",
      locationId
    );
    return response;
  } catch (error) {}
};
