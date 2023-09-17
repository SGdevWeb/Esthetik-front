import React, { useEffect, useState } from "react";
import styles from "./PrestationCard.module.scss";

function PrestationCard({ title, price, index }) {
  const isEven = index % 2 === 0;
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const cardStyles =
    windowWith >= 425
      ? {
          paddingRight: isEven ? "30px" : 0,
          paddingLeft: !isEven ? "30px" : 0,
        }
      : {};

  return (
    <div className={styles.container} style={cardStyles}>
      <div className={styles.titleAndPrice}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.dotted}></div>
        <div className={styles.price}>{price}</div>
      </div>
      <div className={styles.description}></div>
    </div>
  );
}

export default PrestationCard;
