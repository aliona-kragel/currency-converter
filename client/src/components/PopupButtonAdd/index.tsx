import { FC, PropsWithChildren } from "react"
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import styles from './styles.module.scss'
import { IPopupButtonProps } from "types/types";

const PopupButtonAdd: FC<PropsWithChildren<IPopupButtonProps>> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      <AddCircleSharpIcon fontSize="large" className={styles.btn__add} />
      {children}
    </button>
  )
}

export default PopupButtonAdd;