import React, { useEffect, useState } from "react";
import styles from "./Promotion.module.scss";
import promotionImage from "../../../assets/images/Promotion/yunona-uritsky-ajM1jHa0dlg-unsplash.jpg";
import promotionsData from "../../../data/promotion.json";
import axios from "axios";

function Promotion() {
  const [activePromotion, setActivePromotion] = useState(null);

  useEffect(() => {
    const currentDate = new Date();

    const fetchPromotion = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/promotions"
        );
        const promotions = response.data;
        console.log(promotions);
        const filteredPromotion = promotions.find(
          (promotion) =>
            currentDate >= new Date(promotion.start.split(" ").join(" ,")) &&
            currentDate <= new Date(promotion.end.split(" ").join(" ,"))
        );
        setActivePromotion(filteredPromotion);
      } catch (error) {
        console.error("Erreur lors de la récupération des promotions :", error);
      }
    };

    fetchPromotion();

    // const currentDate = new Date();
    // const filteredPromotion = promotionsData.find(
    //   (promotion) =>
    //     currentDate >= new Date(promotion.startDate.split(" ").join(" ,")) &&
    //     currentDate <= new Date(promotion.endDate.split(" ").join(" ,"))
    // );
    // setActivePromotion(filteredPromotion);
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
          src={promotionImage}
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
