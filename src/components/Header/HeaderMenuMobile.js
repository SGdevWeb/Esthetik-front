import React from "react";
import styles from "./HeaderMenuMobile.module.scss";
import { NavLink } from "react-router-dom";

function HeaderMenuMobile({ setShowMenu }) {
  return (
    <div className={`d-flex justify-content-center ${styles.menuContainer}`}>
      <ul className={styles.menu}>
        <NavLink
          onClick={() => setShowMenu(false)}
          className={`d-flex justify-content-center ${styles.link}`}
          to="/"
        >
          Accueil
        </NavLink>
        <NavLink
          onClick={() => setShowMenu(false)}
          className={`d-flex justify-content-center ${styles.link}`}
          to="/prestations"
        >
          Prestations
        </NavLink>
      </ul>
    </div>
  );
}

export default HeaderMenuMobile;
