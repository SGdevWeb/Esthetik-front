import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchPackage = async (rateId) => {
  try {
    const response = await axios.get(`${apiUrl}/packages/rate/${rateId}`);
    const data = await response.data;
    return data;
  } catch {
    console.error("Erreur lors de la récupération des données de forfaits");
  }
};
