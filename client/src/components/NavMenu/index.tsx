import LinkItem from "components/LinkItem";
import styles from "./styles.module.scss";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <CurrencyExchangeIcon fontSize="large" className={styles.icon} />
      <div className={styles.nav__links}>
        <LinkItem to="converter">
          converter
        </LinkItem >
        <LinkItem to="currencies">
          currencies
        </LinkItem>
      </div>
    </nav>
  )
}

export default NavMenu;