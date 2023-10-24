import { CircularProgress } from "@mui/material";
import styles from './styles.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <CircularProgress color="inherit" className={styles.loader__spiner} />
    </div>

  )
}

export default Loader;