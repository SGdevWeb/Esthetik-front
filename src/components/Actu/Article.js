import React, { useEffect, useState } from "react";
import styles from "./Article.module.scss";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../api/articles";

function Article() {
  const articleId = useParams().id;
  const [article, setArticle] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      const article = await fetchArticleById(articleId);
      setArticle(article);
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
