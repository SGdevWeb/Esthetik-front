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
  }
};
