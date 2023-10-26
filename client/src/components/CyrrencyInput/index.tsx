import { TextField } from "@mui/material";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDebounce } from "use-debounce";
import { fetchContent } from "store/slices/converter/converterSlice";
import { ICurrencyInputProps } from "types/types";
import { useTypedDispatch } from "hooks/useTypedDispatch";

const CurrencyInput: FC<PropsWithChildren<ICurrencyInputProps>> = ({ name, label, amount }) => {
  const dispatch = useTypedDispatch();
  const [inputValue, setInputValue] = useState<string>(amount);
  const [debouncedInputValue] = useDebounce(inputValue, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";

    const regex = /^\d+[.]?\d{0,4}$/;

    const isValidInput = regex.test(value);

    if (isValidInput || value === "") {
      setInputValue(value);
    }
  }

  useEffect(() => {
    setInputValue(amount)
  }, [amount]);

  useEffect(() => {
    if (debouncedInputValue === amount) return;
    dispatch(fetchContent({ abbr: label, amount: debouncedInputValue }))
    // eslint-disable-next-line
  }, [debouncedInputValue]);

  return (
    <div className={styles.input__wrapper}>
      {label && <label>{label}</label>}
      <TextField
        id="outlined-helperText"
        value={inputValue}
        helperText={name}
        onInput={handleChange}
        // type="number"
        className={styles.textfield}
        inputProps={{ autoComplete: 'off' }}
      />
    </div>
  )
}

export default CurrencyInput;