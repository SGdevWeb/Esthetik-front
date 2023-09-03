import React from "react";
import styles from "./ArticleCard.module.scss";
import { Link } from "react-router-dom";

function ArticleCard({ id, title, content, image, author, date }) {
  return (
    <Link to={`/actu/articles/${id}`} className={styles.container}>
      <div className={styles.picture}>
        <img
          src={require(`../../assets/images/prestation/${image}.jpg`)}
          alt={title}
        />
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>
          {content.split("<br/>").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <Link to={`/actu/articles/${id}`} className={styles.link}>
          Lire la suite
        </Link>
      </div>
    </Link>
  );
}

export default ArticleCard;
