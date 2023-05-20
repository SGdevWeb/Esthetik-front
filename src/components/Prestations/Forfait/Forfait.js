import React from "react";
import styles from "./Forfait.module.scss";
import dataDiscount from "../../../data/forfait.json";
import ForfaitCard from "../ForfaitCard/ForfaitCard";

function Forfait() {
  return (
    <div className={styles.container}>
      <p>
        Découvrez nos différents forfaits conçus spécialement pour vous offrir
        une expérience de beauté complète à un prix avantageux.
      </p>
      {dataDiscount.map((element, index) => (
        <div key={index} className={styles.discountContainer}>
          <h2>{element.title}</h2>
          <ForfaitCard discounts={element.discounts} />
        </div>
      ))}
    </div>
  );
}

export default Forfait;
