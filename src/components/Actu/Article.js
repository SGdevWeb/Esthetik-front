import React, { useEffect, useState } from "react";
import styles from "./Article.module.scss";
import { Link, useParams } from "react-router-dom";
import { fetchArticleById } from "../../api/articles";
import { fetchRateById } from "../../api/rates";
import DOMPurify from "dompurify";

const apiUrl = process.env.REACT_APP_API_URL;

function Article() {
  const articleId = useParams().id;
  const [article, setArticle] = useState();
  const [rate, setRate] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      const article = await fetchArticleById(articleId);
      setArticle(article);
      if (article && article.rate_id) {
        const rate = await fetchRateById(article.rate_id);
        setRate(rate);
      }
    };

    getArticle();
  }, [articleId]);

  const getSanitizedContent = (content) => {
    return DOMPurify.sanitize(content);
  };

  return (
    <div className={styles.container}>
      {article && (
        <>
          <h1 className={styles.title}>{article.title}</h1>
          <img
            src={`${apiUrl}/uploads/${article.image}`}
            className={styles.image}
            alt={article.image}
          />
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: getSanitizedContent(article.content),
            }}
          />

          <Link
            to={`/prestations/${rate && rate.name}`}
            className={styles.link}
          >
            > Voir les prestations
          </Link>
          <p className={styles.author}>
            Publié le{" "}
            {new Date(article.publication_date).toLocaleDateString({
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}{" "}
            par {article.author}
          </p>
        </>
      )}
    </div>
  );
}

export default Article;
