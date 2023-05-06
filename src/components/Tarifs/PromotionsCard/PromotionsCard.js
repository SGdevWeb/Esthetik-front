import React from "react";
import styles from "./PromotionsCard.module.scss";
import Tarif from "../Tarif/Tarif";

function PromotionsCard({ data }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.sectionTitle}</h2>
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

export default PromotionsCard;
