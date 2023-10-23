import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IConverter } from "./converterTypes";
import currencyService from "services";
import { DEFAULT_CURRENCIES } from "helpers/constants";
import { IRecalculatedCurrencies, IShortedCurrencies } from "types/types";

const initialState: IConverter = {
  isLoading: true,
  error: "",
  recalculatedCurrancies: [],
  formState: [],
  currenciesList: null,
  displayed: DEFAULT_CURRENCIES,
  shortedCurrencies: null,
}

export const fetchContent = createAsyncThunk(
  'converter/fetchContent',
  async (currData: { abbr: string, amount: number }, { rejectWithValue }) => {
    try {
      const { data } = await currencyService.updateCurrencies(currData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Something went wrong");
    }
  }
)

export const getSortedCurrencies = createAsyncThunk(
  'converter/getSortedCurrencies',
  async () => {
    const data = await currencyService.getShortedCurrencies();
    return data;
  }
)
const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setCurrenсiesList: (state, action) => {
      state.currenciesList = action.payload;
    },
    addCurrency: (state, action) => {
      const currId: number = action.payload;
      const addedCurrency = state.recalculatedCurrancies.find(item => item.id === currId);
      if (!addedCurrency) return;
      state.formState = [...state.formState, addedCurrency];
      state.displayed = [...state.displayed, addedCurrency.abbr];
    },
    removeCurrency: (state, action) => {
      const currId: number = action.payload;
      const removedCurrency = state.recalculatedCurrancies.find(item => item.id === currId);
      if (!removedCurrency) return;
      state.formState = state.formState.filter(item => item.id !== currId);
      state.displayed = state.displayed.filter(item => item !== removedCurrency?.abbr)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recalculatedCurrancies = action.payload;
        state.formState = action.payload && state.displayed.map((displayedAbbr => action.payload.find((el: IRecalculatedCurrencies) => el.abbr === displayedAbbr))) //не сбрасывает порядок отображ. полей, после обновления данных
        state.error = null;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

      });
    builder
      .addCase(getSortedCurrencies.fulfilled, (state, action) => {
        state.shortedCurrencies = action.payload.map((item: IShortedCurrencies) => ({ ...item, isDefault: DEFAULT_CURRENCIES.includes(item.abbr) }));
      })
  }
})

export default converterSlice;

