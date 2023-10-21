import { TextField } from "@mui/material";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { fetchContent } from "store/slices/converter/converterSlice";
import { AppDispatch } from "store";
import { ICurrencyInputProps } from "types/types";

const CurrencyInput: FC<PropsWithChildren<ICurrencyInputProps>> = ({ name, label, amount }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputValue, setInputValue] = useState<number>(amount);
  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || 0;
    setInputValue(Number(value));
  }

  useEffect(() => {
    setInputValue(amount)
  }, [amount]);

  useEffect(() => {
    if (debouncedInputValue === amount) return;
    dispatch(fetchContent({ abbr: label, amount: debouncedInputValue }))
  }, [debouncedInputValue]);

  return (
    <div className={styles.input__wrapper}>
      {label && <label>{label}</label>}
      <TextField
        id="outlined-helperText"
        value={inputValue}
        helperText={name}
        onInput={handleChange}
        type="number"
      />
    </div>
  )
}

export default CurrencyInput;