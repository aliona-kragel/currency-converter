import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux"
import currenciesSlice from "store/slices/currencies/currenciesSlice";

const useCurrenciesActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({ ...bindActionCreators(currenciesSlice.actions, dispatch) }),
    [dispatch]
  )
}

export default useCurrenciesActions;