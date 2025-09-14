import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPromotions as apiFetchPromotions,
  addPromotion as apiCreatePromotion,
  updatePromotion as apiUpdatePromotion,
  deletePromotion as apiDeletePromotion,
} from "../../api/promotions";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setPromotions(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    addPromotion(state, action) {
      state.items.push(action.payload);
    },
    updatePromotion(state, action) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deletePromotion(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  startLoading,
  hasError,
  setPromotions,
  addPromotion,
  updatePromotion,
  deletePromotion,
} = promotionSlice.actions;

export const fetchAllPromotions = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await apiFetchPromotions();
    dispatch(setPromotions(response.data));
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || "Erreur serveur"));
  }
};

export const createNewPromotion = (promotionData) => async (dispatch) => {
  try {
    const response = await apiCreatePromotion(promotionData);

    dispatch(addPromotion(response.data));
    return response.data;
  } catch (err) {
    const message = err.response?.data?.message || "Erreur création";
    dispatch(hasError(message));
    throw new Error(message);
  }
};

export const updateExistingPromotion = (id, patchData) => async (dispatch) => {
  try {
    const response = await apiUpdatePromotion(id, patchData);

    const updatedPromotion = {
      ...response.data,
    };

    dispatch(updatePromotion(updatedPromotion));
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || "Erreur update"));
    throw err;
  }
};

export const deleteExistingPromotion = (id) => async (dispatch) => {
  try {
    await apiDeletePromotion(id);
    dispatch(deletePromotion(id));
  } catch (err) {
    dispatch(hasError(err.response?.data?.message || "Erreur delete"));
  }
};

export default promotionSlice.reducer;
