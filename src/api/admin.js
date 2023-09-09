import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const authenticate = async (values) => {
  try {
    const response = await axios.post(`${apiUrl}/signin`, values);
    const data = response.data;
    localStorage.setItem("token", "un token manuel");
    if (data.adminId && data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.error("Erreur lors de l'authentification : ", error);
  }
};
