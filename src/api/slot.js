import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const addSlots = async (values, axiosConfig) => {
  try {
    const response = await axios.post(
      `${apiUrl}/slots/add`,
      values,
      axiosConfig
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de l'ajout des créneaux : ", message);
    return error.response;
  }
};

export function axiosConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export const fetchSlots = async () => {
  try {
    const response = await axios.get(`${apiUrl}/slots`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des créneaux : ", message);
    return error.message;
  }
};
