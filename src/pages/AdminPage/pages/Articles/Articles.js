import styles from "./Articles.module.scss";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";
import Button from "../../../../components/Button/Button";
import ArticleTable from "./ArticleTable/ArticleTable";
import { createArticle, fetchArticles } from "../../../../api/articles";
import InputCustom from "../../../../components/InputCustom/InputCustom";
import SelectCustom from "../../../../components/SelectCustom/SelectCustom";
import { fetchRates } from "../../../../api/rates";
import { format } from "date-fns";

function Articles() {
  const { setPageTitle } = usePageTitle();
  const [articles, setArticles] = useState([]);
  const [creatingArticle, setCreatingArticle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    rateId: "",
    publicationDate: "",
    author: "Virginie",
    image: "epilation",
  });
  const [rates, setRates] = useState([]);
  const [selectedRateId, setSelectedRateId] = useState("");

  useEffect(() => {
    setPageTitle("Articles");
  }, [setPageTitle]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetchArticles();
        setArticles(response.data);
      } catch (error) {
        handleError(error, "Erreur lors de la récupération des articles");
      }
    };

    getArticles();
  }, []);

  useEffect(() => {
    const getRates = async () => {
      try {
        const response = await fetchRates();
        setRates(response.data);
      } catch (error) {
        handleError(error, "Erreur lors de la récupération des tarifs");
      }
    };

    getRates();
  }, []);

  const handleCreateNewArticle = () => {
    setCreatingArticle(true);
  };

  const handleSaveArticle = async () => {
    try {
      const updatedArticle = {
        ...newArticle,
        rateId: selectedRateId,
        publicationDate: format(new Date(), "yyyy-MM-dd"),
      };
      if (!newArticle.title.trim()) {
        setErrorMessage("Veuillez saisir un titre pour votre article");
        return;
      }
      if (!newArticle.content.trim()) {
        setErrorMessage("Veuillez saisir le contenu de votre article");
        return;
      }

      const response = await createArticle(updatedArticle);

      if (response.status === 201) {
        console.log("Article crée avec succès");
        const createdArticle = response.data;
        setArticles((prevArticles) => ({
          ...prevArticles,
          createdArticle,
        }));

        setCreatingArticle(false);
        setNewArticle({
          title: "",
          content: "",
          rateId: "",
          publicationDate: "",
          author: "Virginie",
          image: "epilation",
        });
        setSelectedRateId("");
        setErrorMessage("");
      } else {
        setErrorMessage(
          `Erreur lors de la création de l'article : ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'article : ", error);
      setErrorMessage(
        "Une erreur est survenue lors de la création de l'article."
      );
    }
  };

  const handleCancelCreatingArticle = () => {
    setCreatingArticle(false);
    const initialValue = {
      title: "",
      content: "",
      rateId: "",
      publicationDate: "",
      author: "Virginie",
      image: "epilation",
    };
    console.log(initialValue);
    setNewArticle(initialValue);
    setErrorMessage("");
  };

  const handleError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    setErrorMessage(error.response?.data?.message || defaultMessage);
  };

  return (
    <div className={styles.container}>
      {creatingArticle ? (
        <div className={styles.creationArticleContainer}>
          <h2>Création d'un article</h2>
          <div className={styles.titleContainer}>
            <h3>Titre</h3>
            <div style={{ marginBottom: "10px" }}>
              <InputCustom
                type="text"
                value={newArticle.title}
                placeholder="Titre de l'article"
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.rateContainer}>
            <h3>Catégorie</h3>
            <SelectCustom
              label="Sélectionnez la catégorie"
              options={rates}
              valueProp="id"
              labelProp="name"
              minWidth={250}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedRateId(e.target.value);
              }}
            />
          </div>

          <div className={styles.contentContainer}>
            <h3>Contenu de l'article</h3>
            <InputCustom
              type="text"
              value={newArticle.content}
              placeholder="Rédiger votre article ici"
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
            />
          </div>

          <div className={styles.btnContainer}>
            <Button
              style={{
                padding: "5px 10px",
                marginLeft: "5px",
                fontSize: "0.8rem",
              }}
              color={"var(--secondary-color)"}
              onClick={handleSaveArticle}
            >
              Enregistrer
            </Button>
            <Button
              style={{
                padding: "5px 10px",
                marginLeft: "5px",
                fontSize: "0.8rem",
              }}
              color={"var(--secondary-color)"}
              onClick={handleCancelCreatingArticle}
            >
              Annuler
            </Button>
          </div>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </div>
      ) : (
        <div className={styles.articleDisplay}>
          {articles ? (
            <div>
              <h2 className={styles.title}>Articles</h2>
              <ArticleTable articles={articles} setArticles={setArticles} />
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
