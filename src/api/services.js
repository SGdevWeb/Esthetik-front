import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchServicesByRateId = async (rateId) => {
  try {
    const response = await axios.get(`${apiUrl}/services/${rateId}`);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération prestations", error);
  }
};

export const fetchServicesWithRates = async () => {
  try {
    const response = await axios.get(`${apiUrl}/services/details`);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des prestations", error);
  }
};
