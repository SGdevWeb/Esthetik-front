import { useEffect, useState } from "react";
import styles from "./Promotion.module.scss";
import { fetchPromotions } from "../../../api/promotions";
import DOMPurify from "dompurify";

const apiUrl = process.env.REACT_APP_API_URL;

const getSanitizedContent = (content) => {
  return DOMPurify.sanitize(content);
};

function Promotion() {
  const [activePromotion, setActivePromotion] = useState(null);

  useEffect(() => {
    const currentDate = new Date();

    const getPromotions = async () => {
      const response = await fetchPromotions();
      const promotions = response.data;
      const filteredPromotion = promotions.filter(
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
      {activePromotion &&
        activePromotion.map((promotion) => (
          <div key={promotion.id} className={styles.onePromotion}>
            <h2 className={styles.title}>{promotion.title}</h2>
            <div className={styles.display}>
              <div className={styles.imageContainer}>
                <img
                  src={`${apiUrl}/uploads/${promotion.picture}`}
                  alt={promotion.service}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <p className={styles.promotionText}>{promotion.entitled}</p>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: getSanitizedContent(promotion.description),
                  }}
                />

                <p className={styles.validity}>
                  Offre valable jusqu'au{" "}
                  {new Date(promotion.end).toLocaleDateString({
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Promotion;
