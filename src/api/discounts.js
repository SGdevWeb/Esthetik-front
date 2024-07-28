import axiosInstance from "./axiosInstance";

export const fetchDiscounts = async () => {
  try {
    const response = await axiosInstance.get(`/discounts`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération du secteur des forfaits : ",
      message
    );
    throw error;
  }
};

export const deleteDiscount = async (discountId) => {
  try {
    const response = await axiosInstance.delete(`/discounts/${discountId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la suppression de la remise : ", message);
    throw error;
  }
};

export const updateDiscount = async (discountId, updatedDiscountData) => {
  try {
    const response = await axiosInstance.patch(
      `/discounts/${discountId}`,
      updatedDiscountData
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la mise à jour de la remise : ", message);
    throw error;
  }
};

export const newDiscount = async (newDiscount) => {
  try {
    const response = await axiosInstance.post("/packages", newDiscount);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la création de la remise : ", message);
    throw error;
  }
};
