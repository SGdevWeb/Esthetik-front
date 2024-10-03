import { useEffect, useState } from "react";
import Articles from "../../components/Actu/Articles";
import styles from "./ActuPage.module.scss";
import { fetchArticles } from "../../api/articles";

function Actu() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetchArticles();
      setArticles(response.data);
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
