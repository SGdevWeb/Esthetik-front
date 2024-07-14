import React from "react";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";

function Card({ href, imgUrl, imgTitle, title, description }) {
  return (
    <div className={styles.container}>
      <Link to={href} className={styles.cardLink}>
        <img src={imgUrl} alt={imgTitle} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
