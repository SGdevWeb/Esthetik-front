import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import { fetchServicesByRateId } from "../../../api/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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

  const toggleDropdown = async () => {
    if (!isOpen && !hasFetchedServices) {
      getServices();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <span>{title}</span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className={`${styles.arrow} fa-md`}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdownDescription}>
          {services.map((service, index) => (
            <PrestationCard
              key={index}
              title={service.title}
              price={service.price}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
