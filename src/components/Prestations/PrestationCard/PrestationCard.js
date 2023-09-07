import React from "react";
import styles from "./PrestationCard.module.scss";

function PrestationCard({ title, price, index }) {
  const isEven = index % 2 === 0;
  const cardStyles = {
    paddingRight: isEven ? "30px" : 0,
    paddingLeft: !isEven ? "30px" : 0,
  };

  return (
    <div className={styles.container} style={cardStyles}>
      <div className={styles.titleAndPrice}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.dotted}></div>
        <div className={styles.price}>{price}</div>
      </div>
      <div className={styles.description}></div>
    </div>
  );
}

export default PrestationCard;
