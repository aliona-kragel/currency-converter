import { createSlice } from "@reduxjs/toolkit";
import { ICurrencies } from "./currenciesTypes";


const initialState: ICurrencies = {
  currenciesList: null,
}

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setCurrenсiesList: (state, action) => {
      state.currenciesList = action.payload;
    }
  }
})

export default currenciesSlice;