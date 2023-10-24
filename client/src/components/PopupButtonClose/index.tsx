import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { FC } from 'react';
import { IPopupButtonProps } from 'types/types';
import styles from './styles.module.scss'

const PopupButtonClose: FC<IPopupButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      <CancelSharpIcon fontSize='large' className={styles.btn__close} />
    </button>
  )
}

export default PopupButtonClose;