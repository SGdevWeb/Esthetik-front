import styles from "./Articles.module.scss";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";
import Button from "../../../../components/Button/Button";
import ArticleTable from "./ArticleTable/ArticleTable";
import { fetchArticles } from "../../../../api/articles";

function Articles() {
  const { setPageTitle } = usePageTitle();
  const [articlesData, setArticlesData] = useState([]);
  const [creatingArticle, setCreatingArticle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setPageTitle("Articles");
  }, [setPageTitle]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetchArticles();
        setArticlesData(response.data);
      } catch (error) {
        handleError(error, "Erreur lors de la récupération des articles");
      }
    };

    getArticles();
  }, []);

  const handleCreateNewArticle = () => {
    console.log("Creation d'un article");
  };

  const handleError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    setErrorMessage(error.response?.data?.message || defaultMessage);
  };

  return (
    <div className={styles.container}>
      {creatingArticle ? (
        <div>
          <h2>Création d'un article</h2>
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </div>
      ) : (
        <div className={styles.articleDisplay}>
          {articlesData ? (
            <div>
              <h2 className={styles.title}>Articles</h2>
              <ArticleTable
                articlesData={articlesData}
                setArticlesData={setArticlesData}
              />
            </div>
          ) : (
            <div>
              <p>Aucun article trouvé</p>
            </div>
          )}
          <div className={styles.btnContainer}>
            <Button
              onClick={handleCreateNewArticle}
              color="var(--secondary-color"
            >
              + Créer un nouvel article
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Articles;
