import { configureStore } from "@reduxjs/toolkit";
import converterSlice from "./slices/converter/converterSlice";

const store = configureStore({
  reducer: {
    converter: converterSlice.reducer,
    // currencies: currenciesSlice.reducer
  }
})

export default store;

export type TypeRootState = ReturnType<typeof store.getState>