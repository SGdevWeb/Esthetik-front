import axiosInstance from "./axiosInstance";

export const sendContactEmail = async (values) => {
  try {
    const response = await axiosInstance.post("/contact/send-email", values);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de l'envoie de l'email : ", message);
    throw error;
  }
};
