import React from "react";
import styles from "./Navigation.module.scss";
import data from "../../../data/tarif.json";
import { NavLink } from "react-router-dom";

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
          <li>
            <NavLink to="/prestations/forfait">Forfait</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
