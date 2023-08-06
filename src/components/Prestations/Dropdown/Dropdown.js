import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import axios from "axios";

function Dropdown({ title, rateId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [hasFetchedServices, setHasFetchedServices] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/services/${rateId}`
      );
      setServices(response.data);
      setHasFetchedServices(true);
      setIsOpen(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des tarifs :", error);
    }
  };

  const toogleDropdown = async () => {
    if (!isOpen && !hasFetchedServices) {
      fetchServices();
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
