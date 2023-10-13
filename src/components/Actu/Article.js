import React, { useEffect, useState } from "react";
import styles from "./Article.module.scss";
import { Link, useParams } from "react-router-dom";
import { fetchArticleById } from "../../api/articles";
import { fetchRateById } from "../../api/rates";

function Article() {
  const articleId = useParams().id;
  const [article, setArticle] = useState();
  const [rate, setRate] = useState();

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

  return (
    <div className={styles.container}>
      {article && (
        <>
          <h1 className={styles.title}>{article.title}</h1>
          <img
            src={
              article.image &&
              require(`../../assets/images/prestation/${article.image}.jpg`)
            }
            className={styles.image}
            alt={article.image}
          />
          <div className={styles.content}>
            {article.content &&
              article.content
                .split("<br/>")
                .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <Link
            to={`/prestations/${rate && rate[0].name}`}
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
