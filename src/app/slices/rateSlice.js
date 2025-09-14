import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRates } from "../../api/rates";

export const getRates = createAsyncThunk(
  "rates/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetchRates();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Erreur de chargement des tarifs"
      );
    }
  }
);

const rateSlice = createSlice({
  name: "rates",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getRates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rateSlice.reducer;
