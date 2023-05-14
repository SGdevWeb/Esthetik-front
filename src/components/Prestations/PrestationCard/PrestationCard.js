import React from "react";
import styles from "./PrestationCard.module.scss";

function PrestationCard({ title, price, description }) {
  return (
    <div className={styles.container}>
      <div className={styles.titleAndPrice}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.price}>{price}</div>
      </div>
      <div className={styles.description}></div>
    </div>
  );
}

export default PrestationCard;
