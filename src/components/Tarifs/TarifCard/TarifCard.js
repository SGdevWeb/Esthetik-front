import React from "react";
import Tarif from "../Tarif/Tarif";
import styles from "./TarifCard.module.scss";

function TarifCard({ data }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <span className={styles.flower}>❃</span>
        {data.sectionTitle}
        <span className={styles.flower}>❃</span>
      </h2>
      {data.tarifs.map((element) => (
        <Tarif
          key={element.title}
          title={element.title}
          price={element.price}
        />
      ))}
    </div>
  );
}

export default TarifCard;
