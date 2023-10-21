import { useEffect } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import CurrencyInput from "components/CyrrencyInput";
import { useDispatch } from 'react-redux';
import { fetchContent } from "store/slices/converter/converterSlice";
import { AppDispatch } from "store";
import { DEFAULT_ABBR, DEFAULT_AMOUNT } from "helpers/constants";

const Converter = () => {
  const { formState } = useTypedSelector(state => state.converter);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContent({ abbr: DEFAULT_ABBR, amount: DEFAULT_AMOUNT }));
  }, [])

  return (
    <>
      {!!formState?.length && formState.map(item =>
        <CurrencyInput
          key={item.id}
          label={item.abbr}
          amount={item.amount}
          name={item.name} />)}
    </>
  )
}

export default Converter;