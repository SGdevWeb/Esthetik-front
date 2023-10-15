import React, { useEffect, useState } from "react";
import styles from "./HeaderMenuMobile.module.scss";
import { Link, NavLink, useLocation } from "react-router-dom";

function HeaderMenuMobile({ setShowMenu }) {
  const [isRdvActive, setIsRdvActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsRdvActive(location.pathname === "/rdv");
  }, [location]);

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
            Actualité
          </NavLink>
        </li>
        <button
          onClick={() => setShowMenu(false)}
          className={
            isRdvActive
              ? `${styles.btnRdv} ${styles.btnRdvActive}`
              : styles.btnRdv
          }
        >
          <Link to="/rdv">Prendre RDV</Link>
        </button>
      </ul>
    </div>
  );
}

export default HeaderMenuMobile;
