import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IConverter } from "./converterTypes";
import { ICurrenciesList } from "../../../types/types";

const initialState: IConverter = {
  currenciesList: [],
}
const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setCurrenсiesList: (state, action: PayloadAction<ICurrenciesList[]>) => {
      state.currenciesList = action.payload;
    }
  }
})

export default converterSlice;