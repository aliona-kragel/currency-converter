import { FC, PropsWithChildren } from "react";
import { ISelectItemProps } from "types/types";
import styles from './styles.module.scss';

const CurrencySelectItem: FC<PropsWithChildren<ISelectItemProps>> = ({ children, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={styles.select__item} disabled={disabled}>
      {children}
    </button>
  )
}

export default CurrencySelectItem;