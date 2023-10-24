import NavMenu from "components/NavMenu";
import { Outlet } from "react-router-dom";
import styles from './styles.module.scss'

const MainLayout = () => {
  return (
    <section className={styles.main}>
      <NavMenu />
      <Outlet />
    </section>
  )
}

export default MainLayout;