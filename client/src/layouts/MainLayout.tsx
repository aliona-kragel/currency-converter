import NavMenu from "components/NavMenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getClientDomain, DEFAULT_ABBR, DEFAULT_AMOUNT } from "helpers/constants";
import { useTypedDispatch } from "hooks/useTypedDispatch";
import { fetchContent } from "store/slices/converter/converterSlice";
import styles from './styles.module.scss'

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (window.location.href === getClientDomain()) {
      navigate('/converter');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchContent({ abbr: DEFAULT_ABBR, amount: DEFAULT_AMOUNT }));
    // eslint-disable-next-line
  }, []);

  return (
    <section className={styles.main}>
      <NavMenu />
      <Outlet />
    </section>
  )
}

export default MainLayout;