import { useEffect, useState } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import CurrencyInput from "components/CyrrencyInput";
import { useDispatch } from 'react-redux';
import { fetchContent, getSortedCurrencies } from "store/slices/converter/converterSlice";
import { AppDispatch } from "store";
import { DEFAULT_ABBR, DEFAULT_AMOUNT } from "helpers/constants";
import CurrencySelector from "components/CurrencySelector";
import PopupButtonAdd from "components/PopupButtonAdd";
import styles from './styles.module.scss'

const Converter = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { formState } = useTypedSelector(state => state.converter);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContent({ abbr: DEFAULT_ABBR, amount: DEFAULT_AMOUNT }));
  }, []);

  useEffect(() => {
    dispatch(getSortedCurrencies())
  }, [])

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <section className={styles.converter}>
      <CurrencySelector open={open} setOpen={setOpen} />
      <div className={styles.converter__fields}>
        {!!formState?.length && formState.map(item =>
          <CurrencyInput
            key={item.id}
            label={item.abbr}
            amount={item.amount}
            name={item.name} />)}
      </div>
      <PopupButtonAdd onClick={handleClick}>Добавить валюту</PopupButtonAdd>
    </section>
  )
}

export default Converter;