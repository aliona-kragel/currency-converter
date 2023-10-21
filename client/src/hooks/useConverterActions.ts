import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux"
import converterSlice from "store/slices/converter/converterSlice";
import { fetchContent } from "store/slices/converter/converterSlice";

const useConverterActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({ ...bindActionCreators(converterSlice.actions, dispatch), fetchContent }),
    [dispatch]
  )
}

export default useConverterActions;