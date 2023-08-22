import React, { useEffect, useState } from "react";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Forfait from "../Forfait/Forfait";
import { fetchRates } from "../../../api/rates";

function Navigation() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchRates();
      setRates(rates);
    };

    getRates();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <ul>
          {rates.map((rate, index) => (
            <li key={index}>
              <NavLink
                className={styles.navlink}
                to={`/prestations/${rate.name.split(" ").join("_")}`}
              >
                {rate.name}
              </NavLink>
              <div className={styles.dropdown}>
                <Dropdown key={index} title={rate.name} rateId={rate.id} />
              </div>
            </li>
          ))}
          <li>
            <NavLink className={styles.navlink} to="/prestations/forfait">
              Forfaits
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
