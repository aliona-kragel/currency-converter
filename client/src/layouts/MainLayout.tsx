import NavMenu from "components/NavMenu";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './styles.module.scss'
import { useEffect } from "react";
import { CLIENT_DOMAIN } from "helpers/constants";

const MainLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.href === CLIENT_DOMAIN) {
      navigate('/converter');
    }
  }, []);
  return (
    <section className={styles.main}>
      <NavMenu />
      <Outlet />
    </section>
  )
}

export default MainLayout;