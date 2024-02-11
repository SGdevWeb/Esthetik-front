import axiosInstance from "./axiosInstance";

export const fetchAddressSuggestions = async (inputText) => {
  try {
    const response = await axiosInstance.get(
      `/autocomplete?q=${encodeURIComponent(inputText)}`
    );
    console.log("data in call api", response.data);
    return response.data;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération des suggestions d'adresse : ",
      message
    );
    return error.message;
  }
};
