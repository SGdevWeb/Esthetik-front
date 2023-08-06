import React, { useEffect, useState } from "react";
import styles from "./Forfait.module.scss";
import ForfaitCard from "../ForfaitCard/ForfaitCard";
import axios from "axios";

function Forfait() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/discounts");
        const discounts = response.data;

        // Remises(discounts) groupées par tarif(rate)
        const groupedDiscounts = discounts.reduce((acc, discount) => {
          if (!acc[discount.rate]) {
            acc[discount.rate] = [];
          }
          acc[discount.rate].push(discount);
          return acc;
        }, {});

        setDiscounts(groupedDiscounts);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du secteur d'activité : ",
          error
        );
      }
    };

    fetchDiscount();
  }, []);

  return (
    <div className={styles.container}>
      <p>
        Découvrez nos différents forfaits conçus spécialement pour vous offrir
        une expérience de beauté complète à un prix avantageux.
      </p>
      {Object.keys(discounts).map((rate) => (
        <div key={rate} className={styles.discountContainer}>
          <h2>{rate}</h2>
          {discounts[rate].map((discount, index) => (
            <ForfaitCard
              key={index}
              title={discount.title}
              discount={discount.discount}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Forfait;
