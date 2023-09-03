import { useEffect, useState } from "react";
import Articles from "../../components/Actu/Articles";
import styles from "./Actu.module.scss";
import { fetchArticles } from "../../api/articles";

function Actu() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const articles = await fetchArticles();
      setArticles(articles);
    };

    getArticles();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Votre actualité beauté</h1>
      <Articles articles={articles} />
    </div>
  );
}

export default Actu;
