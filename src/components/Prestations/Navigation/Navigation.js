import React from "react";
import styles from "./Navigation.module.scss";
import dataTarif from "../../../data/tarif.json";
import { NavLink } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Forfait from "../Forfait/Forfait";

function Navigation() {
  return (
    <>
      <div className={styles.container}>
        <ul>
          {dataTarif.map((element, index) => (
            <li key={index}>
              <NavLink
                className={styles.navlink}
                to={`/prestations/${element.service.split(" ").join("_")}`}
              >
                {element.service}
              </NavLink>
              <div className={styles.dropdown}>
                <Dropdown
                  title={element.service}
                  content={element.prestations}
                />
              </div>
            </li>
          ))}
          <li>
            <NavLink className={styles.navlink} to="/prestations/forfait">
              Forfait
            </NavLink>
            <div className={`${styles.forfaitCard} d-flex flex-column mt-20`}>
              <h2 className={styles.sectionTitle}>FORFAIT</h2>
              <Forfait />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
