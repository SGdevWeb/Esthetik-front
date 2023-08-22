import React, { useEffect, useState } from "react";
import styles from "./Forfait.module.scss";
import ForfaitCard from "../ForfaitCard/ForfaitCard";
import { fetchDiscounts } from "../../../api/discounts";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

function Forfait() {
  const anchorRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const anchor = searchParams.get("ancre");

  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const getDiscount = async () => {
      const discounts = await fetchDiscounts();

      // Remises(discounts) groupées par tarif(rate)
      const groupedDiscounts = discounts.reduce((acc, discount) => {
        // On vérifie que le tarif n'existe pas encore comme clé dans l'acc
        if (!acc[discount.rate]) {
          // On ajoute le tarif comme clé avec un tableau vide comme valeur
          acc[discount.rate] = [];
        }
        // On ajoute la remise actuelle au tableau coreespondant au tarif
        acc[discount.rate].push(discount);
        return acc;
      }, {});

      setDiscounts(groupedDiscounts);
    };

    getDiscount();
  }, []);

  useEffect(() => {
    if (anchor && anchorRef.current) {
      anchorRef.current.scrollIntoView({ bahavior: "smooth" });
    }
  });

  return (
    <div className={styles.container}>
      <p>
        Découvrez nos différents forfaits conçus spécialement pour vous offrir
        une expérience de beauté complète à un prix avantageux.
      </p>
      {Object.keys(discounts).map((rate) => (
        <div key={rate} className={styles.discountContainer}>
          <h2 ref={anchorRef} id={rate}>
            {rate}
          </h2>
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
