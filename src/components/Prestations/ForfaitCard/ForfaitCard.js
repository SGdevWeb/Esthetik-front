import React from "react";
import styles from "./ForfaitCard.module.scss";

function ForfaitCard({ title, discount }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.dotted}></div>
      <div className={styles.discount}>{discount}</div>
    </div>
  );
}

export default ForfaitCard;
