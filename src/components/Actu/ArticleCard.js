import React from "react";
import styles from "./ArticleCard.module.scss";
import { Link } from "react-router-dom";
import { generateSlug } from "../../utils/generateSlug";

function ArticleCard({ id, title, content, image, author, date }) {
  const slug = generateSlug(title);

  return (
    <div to={`/actu/articles/${id}`} className={styles.container}>
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
        <Link to={`/actu/articles/${id}-${slug}`} className={styles.link}>
          Lire la suite
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;
