import { createSlice } from "@reduxjs/toolkit";
import { IConverter } from "./converterTypes";

const initialState: IConverter = {
  currenciesList: null,
}
const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setCurrenсiesList: (state, action) => {
      state.currenciesList = action.payload;
    }
  }
})

export default converterSlice;