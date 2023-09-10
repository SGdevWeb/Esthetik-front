import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchLocations = async () => {
  try {
    const response = await axios.get(`${apiUrl}/locations`);
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

export const newLocation = async (values, axiosConfig) => {
  try {
    const response = await axios.post(
      `${apiUrl}/locations/new`,
      values,
      axiosConfig
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la création de la ville : ", message);
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
