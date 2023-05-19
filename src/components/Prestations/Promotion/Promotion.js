import React, { useEffect, useState } from "react";
import styles from "./Promotion.module.scss";
import promotionImage from "../../../assets/images/Promotion/yunona-uritsky-ajM1jHa0dlg-unsplash.jpg";
import promotionsData from "../../../data/promotion.json";

function Promotion() {
  const [activePromotion, setActivePromotion] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const filteredPromotion = promotionsData.find(
      (promotion) =>
        currentDate >= new Date(promotion.startDate.split(" ").join(" ,")) &&
        currentDate <= new Date(promotion.endDate.split(" ").join(" ,"))
    );
    setActivePromotion(filteredPromotion);
  }, []);

  if (!activePromotion) {
    return null; // Aucune promotion active
  }

  return (
    <div className={styles.container}>
      <h2>{activePromotion.title}</h2>
      <div className={styles.promotionContainer}>
        <img src={promotionImage} alt={activePromotion.service} />
        <p className={styles.promotionText}>{activePromotion.imageText}</p>
      </div>
      <p className={styles.description}>{activePromotion.promotionText}</p>
    </div>
  );
}

export default Promotion;
