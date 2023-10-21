import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IConverter } from "./converterTypes";
import currencyService from "services";
import { DEFAULT_CURRENCIES } from "helpers/constants";
import { IRecalculatedCurrencies } from "types/types";


const initialState: IConverter = {
  recalculatedCurrancies: [],
  formState: [],
  currenciesList: null,
  displayed: DEFAULT_CURRENCIES,
  shortedCurrencies: null,
}

export const fetchContent = createAsyncThunk(
  'converter/fetchContent',
  async (currData: { abbr: string, amount: number }) => {
    const { data } = await currencyService.updateCurrencies(currData);
    return data;
  }
)

const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setRecalculatedCurrancies: (state, action) => {
      state.recalculatedCurrancies = action.payload;
    },
    setCurrenсiesList: (state, action) => {
      state.currenciesList = action.payload;
    },
    setShortedCurrenсies: (state, action) => {
      state.shortedCurrencies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.recalculatedCurrancies = action.payload;
      state.formState = action.payload.filter((el: IRecalculatedCurrencies) => state.displayed.includes(el.abbr));
    })
  }
})

export default converterSlice;