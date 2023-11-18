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

export const fetchSlotsDetails = async () => {
  try {
    const response = await axiosInstance.get("/slots/details");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des créneaux : ", message);
    return error.message;
  }
};

export const deleteSlot = async (slotId) => {
  try {
    const response = await axiosInstance.delete(`/slots/${slotId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la suppression du créneau : ", message);
    return error.response;
  }
};

export const updateSlot = async (slotId, updatedSlotData) => {
  try {
    const response = await axiosInstance.patch(
      `/slots/${slotId}`,
      updatedSlotData
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la mise à jour du créneau : ", message);
    return error.response;
  }
};
