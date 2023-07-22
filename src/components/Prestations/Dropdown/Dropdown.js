import React, { useState } from "react";
import styles from "./Dropdown.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";

function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(props.content);

  return isOpen ? (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown} onClick={() => setIsOpen(false)}>
        <span>{props.title}</span>
        <i className="fa-solid fa-chevron-up fa-md arrow"></i>
      </div>
      <div className={styles.dropdownDescription}>
        {Array.isArray(props.content) ? (
          props.content.map((element, index) => (
            <PrestationCard title={element.title} price={element.price} />
          ))
        ) : (
          <div>{props.content}</div>
        )}
      </div>
    </div>
  ) : (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown} onClick={() => setIsOpen(true)}>
        <span>{props.title}</span>
        <i className="fa-solid fa-chevron-down fa-md arrow"></i>
      </div>
    </div>
  );
}

export default Dropdown;
