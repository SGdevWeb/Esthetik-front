import React, { useEffect, useState } from "react";
import styles from "./Promotion.module.scss";
import { fetchPromotions } from "../../../api/promotions";

function Promotion() {
  const [activePromotion, setActivePromotion] = useState(null);

  useEffect(() => {
    const currentDate = new Date();

    const getPromotions = async () => {
      const promotions = await fetchPromotions();
      const filteredPromotion = promotions.find(
        (promotion) =>
          currentDate >= new Date(promotion.start.split(" ").join(" ,")) &&
          currentDate <= new Date(promotion.end.split(" ").join(" ,"))
      );
      setActivePromotion(filteredPromotion);
    };

    getPromotions();
  }, []);

  if (!activePromotion) {
    return null; // Aucune promotion active
  }

  return (
    <div className={styles.container}>
      <h2>{activePromotion.title}</h2>
      <p className={styles.description}>{activePromotion.description}</p>
      <div className={styles.promotionContainer}>
        <img
          src={require(`../../../assets/images/Promotion/${activePromotion.picture}`)}
          alt={activePromotion.service}
          className={styles.image}
        />
        <p className={styles.promotionText}>{activePromotion.imageText}</p>
      </div>
      <p>
        Offre valable jusqu'au{" "}
        {new Date(activePromotion.end).toLocaleDateString({
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
    </div>
  );
}

export default Promotion;
