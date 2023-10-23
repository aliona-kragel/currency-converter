import { useEffect, useState } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import CurrencyInput from "components/CyrrencyInput";
import { fetchContent, getSortedCurrencies } from "store/slices/converter/converterSlice";
import { DEFAULT_ABBR, DEFAULT_AMOUNT } from "helpers/constants";
import CurrencySelector from "components/CurrencySelector";
import PopupButtonAdd from "components/PopupButtonAdd";
import styles from './styles.module.scss'
import { useTypedDispatch } from "hooks/useTypedDispatch";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";

const Converter = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { formState, isLoading, error } = useTypedSelector(state => state.converter);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchContent({ abbr: DEFAULT_ABBR, amount: DEFAULT_AMOUNT }));
  }, []);

  useEffect(() => {
    dispatch(getSortedCurrencies())
  }, [])

  const handleClick = () => {
    setOpen(true)
  }
  {
    // isLoading ? <CircularProgress className={styles.converter__loader} /> :
    return (
      <section className={styles.converter}>
        {error && error.length > 0 && (
          <Alert severity="error">
            {error} — <strong>check it out!</strong>
          </Alert>)
        }
        <CurrencySelector open={open} setOpen={setOpen} />
        {!!formState?.length &&
          <div className={styles.converter__fields}>
            {!!formState?.length && formState.map(item =>
              <CurrencyInput
                key={item.id}
                label={item.abbr}
                amount={item.amount}
                name={item.name} />)}
            <PopupButtonAdd onClick={handleClick}>Добавить валюту</PopupButtonAdd>
          </div>
        }
      </section>
    )
  }
}

export default Converter;