import axiosInstance from "./axiosInstance";

export const addAppointment = async (values, axiosConfig) => {
  try {
    const response = await axiosInstance.post("/appointment/create", values);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.log(error.response);
    console.error("Erreur lors de la création du rendez-vous : ", message);
    return error.response;
  }
};

export const fetchAppointments = async () => {
  try {
    const response = await axiosInstance.get("/appointments");
    return response;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du secteur des rendez-vous : ",
      error
    );
    return error;
  }
};

export const fetchAppointmentsDetails = async () => {
  try {
    const response = await axiosInstance.get("/appointments/details");
    return response;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du secteur des rendez-vous : ",
      error
    );
    return error;
  }
};

export const confirmAppointment = async (appointmentId, appointment) => {
  try {
    const values = { appointmentId, appointment };
    const response = await axiosInstance.post("/appointments/confirm", values);
    return response;
  } catch (error) {
    console.error("Erreur lors de la confirmation du rendez-vous : ", error);
    return error;
  }
};

export const deleteAppointmentServices = async (appointmentId) => {
  try {
    const response = await axiosInstance.delete(
      `/appointments/${appointmentId}/services`
    );
    return response;
  } catch (error) {
    console.error("Erreur : ", error);
    return error;
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
    console.error("Erreur : ", error);
    return error;
  }
};
