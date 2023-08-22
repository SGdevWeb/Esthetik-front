import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import { fetchServicesByRateId } from "../../../api/services";

function Dropdown({ title, rateId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [hasFetchedServices, setHasFetchedServices] = useState(false);

  const getServices = async () => {
    const services = await fetchServicesByRateId(rateId);
    setServices(services);
    setHasFetchedServices(true);
    setIsOpen(true);
  };

  const toogleDropdown = async () => {
    if (!isOpen && !hasFetchedServices) {
      getServices();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return isOpen ? (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown} onClick={toogleDropdown}>
        <span>{title}</span>
        <i className="fa-solid fa-chevron-up fa-md arrow"></i>
      </div>
      <div className={styles.dropdownDescription}>
        {services.map((service, index) => (
          <PrestationCard
            key={index}
            title={service.title}
            price={service.price}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown} onClick={toogleDropdown}>
        <span>{title}</span>
        <i className="fa-solid fa-chevron-down fa-md arrow"></i>
      </div>
    </div>
  );
}

export default Dropdown;
