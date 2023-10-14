import React from "react";
import styles from "./Articles.module.scss";
import ArticleCard from "./ArticleCard";

function Articles({ articles }) {
  return (
    <div className={styles.container}>
      <div className={styles.paragraph}>
        <p className={styles.bold}>
          Bienvenue dans notre univers dédié à votre beauté.
        </p>
        <p>
          Plongez dans un monde où la beauté prend vie. Découvrez nos articles
          passionnants sur l'épilation, les massages apaisants, les soins
          revitalisants et les secrets du maquillage, pour révéler votre éclat
          naturel sous son meilleur jour.
        </p>
      </div>
      {articles.length > 0 &&
        articles.map((article, index) => (
          <ArticleCard
            key={index}
            id={article.id}
            title={article.title}
            content={article.content}
            image={article.image}
            author={article.author}
            date={article.publication_date}
          />
        ))}
    </div>
  );
}

export default Articles;
