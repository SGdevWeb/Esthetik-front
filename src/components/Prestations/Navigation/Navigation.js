import React from "react";
import styles from "./Navigation.module.scss";
import data from "../../../data/tarif.json";
import { NavLink, Outlet } from "react-router-dom";

function Navigation() {
  return (
    <>
      <div className={styles.container}>
        <ul>
          {data.map((element, index) => (
            <li key={index}>
              <NavLink
                to={`/prestations/${element.service.split(" ").join("_")}`}
              >
                {element.service}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Navigation;
