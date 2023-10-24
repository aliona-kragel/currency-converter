import { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

interface ILinkItem {
  to: string;
}

const LinkItem: FC<PropsWithChildren<ILinkItem>> = ({ to, children }) => {
  return (
    <div className={styles.link__container}>
      <NavLink to={to} className={({ isActive }) => isActive ? `${styles.link__item} ${styles.active__link}` : `${styles.link__item}`}>
        {children}
      </NavLink>
    </div>
  )
}

export default LinkItem;