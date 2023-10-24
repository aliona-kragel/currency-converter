import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICurrencies } from "./currenciesTypes";
import currencyService from "services";


const initialState: ICurrencies = {
  currenciesList: null,
  isLoading: true,
}

export const getCurrencies = createAsyncThunk(
  'currencies/getCurrencies',
  async () => {
    try {
      const data = await currencyService.getCurrencies();
      return data;
    } catch (err: any) {
      return err.message
    }
  }
)

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currenciesList = action.payload;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.isLoading = false;
      })
  }
})

export default currenciesSlice;