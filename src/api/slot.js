import axiosInstance from "./axiosInstance";

export const addSlots = async (values) => {
  try {
    const response = await axiosInstance.post("/slots/add", values);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de l'ajout des créneaux : ", message);
    return error.response;
  }
};

export const fetchSlots = async () => {
  try {
    const response = await axiosInstance.get("/slots");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des créneaux : ", message);
    return error.message;
  }
};

export const fetchAvailableSlots = async () => {
  try {
    const response = await axiosInstance.get("/slots/available");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des créneaux : ", message);
    return error.message;
  }
};
