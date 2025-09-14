import { configureStore } from "@reduxjs/toolkit";
import promotionReducer from "./slices/promotionSlice";
import rateReducer from "./slices/rateSlice";

export const store = configureStore({
  reducer: {
    promotions: promotionReducer,
    rates: rateReducer,
  },
});
