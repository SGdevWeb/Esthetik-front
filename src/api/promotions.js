import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchPromotions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/promotions`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des promotions :", error);
  }
};
