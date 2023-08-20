import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchServicesByRateId = async (rateId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/services/${rateId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de services");
  }
};
