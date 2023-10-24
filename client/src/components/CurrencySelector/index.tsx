import { FC } from "react";
import useConverterActions from "hooks/useConverterActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ICurrencySelectorProps } from "types/types";
import DialogWrapper from "components/DilogWrapper";
import PopupButtonClose from "components/PopupButtonClose";
import CurrencySelectItem from "components/CurrencySelectItem";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import styles from './styles.module.scss'

const CurrencySelector: FC<ICurrencySelectorProps> = ({ open, setOpen }) => {
  const { shortedCurrencies, displayed } = useTypedSelector(state => state.converter);
  const { addCurrency, removeCurrency } = useConverterActions();

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = (id: number, abbr: string) => {
    if (displayed.includes(abbr)) {
      removeCurrency(id)
    } else {
      addCurrency(id);
    }
  }

  return (
    <DialogWrapper open={open} onClose={handleClose} >
      <div className={styles.dialog__header}>
        <h2>Выберите валюту</h2>
        <PopupButtonClose onClick={handleClose} />
      </div>
      <div className={styles.dialog__select}>
        {!!shortedCurrencies?.length && shortedCurrencies.map((item) =>
          <CurrencySelectItem key={item.id} onClick={() => handleClick(item.id, item.abbr)} disabled={item.isDefault}>
            {displayed.includes(item.abbr) ? <RemoveCircleOutlineSharpIcon /> : <AddCircleOutlineSharpIcon />}
            <span>{item.name}</span><span>{item.abbr}</span>
          </CurrencySelectItem>
        )}
      </div>
    </DialogWrapper >
  )
}

export default CurrencySelector;