import axiosInstance from "./axiosInstance";

export const addAppointment = async (values) => {
  try {
    const response = await axiosInstance.post("/appointment/create", values);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la création du rendez-vous : ", message);
    throw error;
  }
};

export const fetchAppointments = async () => {
  try {
    const response = await axiosInstance.get("/appointments");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération du secteur des rendez-vous : ",
      message
    );
    throw error;
  }
};

export const fetchAppointmentsDetails = async () => {
  try {
    const response = await axiosInstance.get("/appointments/details");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération du secteur des rendez-vous : ",
      message
    );
    throw error;
  }
};

export const confirmAppointment = async (appointmentId, appointment) => {
  try {
    const values = { appointmentId, appointment };
    const response = await axiosInstance.post("/appointments/confirm", values);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la confirmation du rendez-vous : ", message);
    throw error;
  }
};

export const deleteAppointmentServices = async (appointmentId) => {
  try {
    const response = await axiosInstance.delete(
      `/appointments/${appointmentId}/services`
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la suppression des prestations du rendez-vous : ",
      message
    );
    throw error;
  }
};

export const addAppointmentServices = async (appointmentId, services) => {
  try {
    const response = await axiosInstance.post(
      `/appointments/${appointmentId}/services`,
      { services }
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de l'ajout des prestations du rendez-vous : ",
      message
    );
    throw error;
  }
};
