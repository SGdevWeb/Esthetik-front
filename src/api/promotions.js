import axiosInstance from "./axiosInstance";

export const fetchPromotions = async () => {
  try {
    const response = await axiosInstance.get(`/promotions`);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des promotions :", error);
  }
};

export const updatePromotion = async (promotionId, formData) => {
  try {
    const response = await axiosInstance.patch(
      `/promotions/${promotionId}`,
      formData,
      {
        header: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      `Erreur lors de la modification de la promotion : ${message}`
    );
    throw error;
  }
};

export const deletePromotion = async (promotionId) => {
  try {
    const response = await axiosInstance.delete(`/promotions/${promotionId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la suppression de la promotion : ", message);
    throw error;
  }
};

export const addPromotion = async (newPromotionFormData) => {
  try {
    const response = await axiosInstance.post(
      `/promotions`,
      newPromotionFormData
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(`Erreur lors de l'ajout de la promotion : ${message}`);
    throw error;
  }
};
