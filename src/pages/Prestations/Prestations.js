import React from "react";
import styles from "./Prestations.module.scss";
import { NavLink, Outlet } from "react-router-dom";

function Prestations() {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink end to="">
              Epilations
            </NavLink>
          </li>
          <li>
            <NavLink to="visage">Soins visage</NavLink>
          </li>
          <li>
            <NavLink to="modelage">Modelage Corps</NavLink>
          </li>
          <li>
            <NavLink to="regard">Beauté du Regard</NavLink>
          </li>
          <li>
            <NavLink to="mains">Beauté des Mains</NavLink>
          </li>
          <li>
            <NavLink to="maquillage">Maquillage</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Prestations;
