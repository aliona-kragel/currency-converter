import LinkItem from "components/LinkItem";
import styles from "./styles.module.scss";
import Logo from "components/Logo";

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <div className={styles.nav__links}>
        <LinkItem to="converter">
          конвертер
        </LinkItem >
        <LinkItem to="currencies">
          курсы валют
        </LinkItem>
      </div>
    </nav>
  )
}

export default NavMenu;