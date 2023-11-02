import React from "react";
import styles from "./Card.module.scss";

function Card({ href, imgUrl, imgTitle, title, description }) {
  return (
    <div className={styles.container}>
      <a href={href} className={styles.cardLink}>
        <img src={imgUrl} alt={imgTitle} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </a>
    </div>
  );
}

export default Card;
