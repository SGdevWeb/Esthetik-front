import React from "react";
import styles from "./ForfaitCard.module.scss";

function ForfaitCard({ discounts }) {
  return (
    <>
      {discounts.map((element, index) => (
        <div key={index} className={styles.container}>
          <h3 className={styles.title}>{element.title}</h3>
          <div className={styles.dotted}></div>
          <div className={styles.discount}>{element.discount}</div>
        </div>
      ))}
    </>
  );
}

export default ForfaitCard;
