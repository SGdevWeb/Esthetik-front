import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchRates = async () => {
  try {
    const response = await axios.get(`${apiUrl}/rates`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de tarifs");
  }
};

export const fetchRateById = async (rateId) => {
  try {
    const response = await axios.get(`${apiUrl}/rates/id/${rateId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de tarifs");
  }
};

export const fetchRateIdByName = async (rateName) => {
  try {
    const response = await axios.get(`${apiUrl}/rates/name/${rateName}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données de tarifs");
  }
};
