import React from "react";
import styles from "./HeaderMenuMobile.module.scss";
import { NavLink } from "react-router-dom";

function HeaderMenuMobile({ setShowMenu }) {
  return (
    <div className={`d-flex justify-content-center ${styles.menuContainer}`}>
      <ul className={styles.menu}>
        <li>
          <NavLink
            onClick={() => setShowMenu(false)}
            className={`d-flex justify-content-center ${styles.link}`}
            to="/"
          >
            Accueil
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            onClick={() => setShowMenu(false)}
            className={`d-flex justify-content-center ${styles.link}`}
            to="/prestations"
          >
            Prestations
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            onClick={() => setShowMenu(false)}
            className={`d-flex justify-content-center ${styles.link}`}
            to="/actu"
          >
            Actu
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenuMobile;
