import axiosInstance from "./axiosInstance";

export const fetchDailyVisits = async () => {
  try {
    const response = await axiosInstance.get("/stats/daily-visits");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des stats : ", message);
    throw error;
  }
};

export const fetchTopPages = async () => {
  try {
    const response = await axiosInstance.get("/stats/most-visited-page");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des stats : ", message);
    throw error;
  }
};

export const fetchAverageTime = async () => {
  try {
    const response = await axiosInstance.get("/stats/average-time");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des stats : ", message);
    throw error;
  }
};

export const fetchBounceRate = async () => {
  try {
    const response = await axiosInstance.get("/stats/bounce-rate");
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la récupération des stats : ", message);
    throw error;
  }
};
