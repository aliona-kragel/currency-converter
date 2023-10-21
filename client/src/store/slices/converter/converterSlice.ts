import { createSlice } from "@reduxjs/toolkit";
import { IConverter } from "./converterTypes";

const initialState: IConverter = {
  currenciesList: null,
  shortedCurrencies: null,
}
const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setCurrenсiesList: (state, action) => {
      state.currenciesList = action.payload;
    },
    setShortedCurrenсies: (state, action) => {
      state.shortedCurrencies = action.payload;
    },
  }
})

export default converterSlice;