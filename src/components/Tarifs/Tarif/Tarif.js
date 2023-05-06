import React from "react";
import styles from "./Tarif.module.scss";

function Tarif({ title, price }) {
  return (
    <div className={styles.container}>
      <div>{title}</div>
      <div>{price}€</div>
    </div>
  );
}

export default Tarif;
