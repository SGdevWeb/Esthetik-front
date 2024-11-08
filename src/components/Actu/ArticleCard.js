import React from "react";
import styles from "./ArticleCard.module.scss";
import { Link } from "react-router-dom";
import { generateSlug } from "../../utils/generateSlug";
import DOMPurify from "dompurify";

const apiUrl = process.env.REACT_APP_API_URL;

function ArticleCard({ id, title, content, image, author, date }) {
  const slug = generateSlug(title);

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div to={`/actu/articles/${id}`} className={styles.container}>
      <div className={styles.picture}>
        <img src={`${apiUrl}/uploads/${image}`} alt={title} />
      </div>
      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <Link to={`/actu/articles/${id}-${slug}`} className={styles.link}>
          Lire la suite
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;
