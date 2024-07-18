import React, { useEffect, useState } from "react";
import styles from "./Navigation.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Forfait from "../Forfait/Forfait";
import { fetchRates } from "../../../api/rates";

function Navigation() {
  const [rates, setRates] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  const showForSmallScreenAndPath =
    (window.innerWidth < 425 && location.pathname === "/prestations") ||
    window.innerWidth > 425;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchRates();
      setRates(rates);
    };

    getRates();
  }, []);

  return (
    <>
      {showForSmallScreenAndPath && (
        <div className={styles.container}>
          <ul>
            {rates.map((rate, index) => (
              <li key={index}>
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
      )}
    </>
  );
}

export default Navigation;
