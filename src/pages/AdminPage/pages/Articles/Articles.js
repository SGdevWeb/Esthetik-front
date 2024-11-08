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
import getErrorMessage from "../../../../utils/errorMessages";
import { useError } from "../../../../contexts/ErrorContext";
import TextEditor from "../../../../components/TextEditor/TextEditor";

function Articles() {
  const { setPageTitle } = usePageTitle();
  const [articles, setArticles] = useState([]);
  const [creatingArticle, setCreatingArticle] = useState(false);
  const { errorMessage, setErrorMessage } = useError();
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    rateId: "",
    publicationDate: "",
    author: "Virginie",
    imageCategory: "article",
  });
  const [rates, setRates] = useState([]);
  const [selectedRateId, setSelectedRateId] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setPageTitle("Articles");
  }, [setPageTitle]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await fetchArticles();
        setArticles(response.data);
      } catch (error) {
        const errorMessage = getErrorMessage(
          error.response?.status,
          "Articles"
        );
        setErrorMessage(errorMessage);
      }
    };

    getArticles();
  }, [setErrorMessage]);

  useEffect(() => {
    const getRates = async () => {
      try {
        const response = await fetchRates();
        setRates(response.data);
      } catch (error) {
        const errorMessage = getErrorMessage(error.response?.status, "Tarifs");
        setErrorMessage(errorMessage);
      }
    };

    getRates();
  }, [setErrorMessage]);

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

      if (!image) {
        setErrorMessage("Veuillez sélectionner une image pour l'article");
      }

      const formData = new FormData();

      formData.append("title", updatedArticle.title);
      formData.append("content", updatedArticle.content);
      formData.append("rateId", updatedArticle.rateId);
      formData.append("publicationDate", updatedArticle.publicationDate);
      formData.append("author", updatedArticle.author);
      formData.append("image", image);
      formData.append("imageCategory", updatedArticle.imageCategory);

      const response = await createArticle(formData);

      if (response.status === 201) {
        const createdArticle = response.data;
        setArticles((prevArticles) => [...prevArticles, createdArticle]);

        setCreatingArticle(false);
        setNewArticle({
          title: "",
          content: "",
          rateId: "",
          publicationDate: "",
        });
        setImage(null);
        setSelectedRateId("");
        setErrorMessage("");
      } else {
        const errorMessage = getErrorMessage(response.status);
        setErrorMessage(
          `Erreur lors de la création de l'article : ${errorMessage}`
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'article : ",
        error.response?.data?.message || error.message
      );
      setErrorMessage(
        "Une erreur est survenue lors de la création de l'article : " +
          (error.response?.data?.message || error.message)
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
    };
    setNewArticle(initialValue);
    setErrorMessage("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleEditorChange = (content) => {
    setNewArticle((prevArticle) => ({
      ...prevArticle,
      content,
    }));
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

          <div className={styles.imageContainer}>
            <h3>Image de présentation</h3>
            <input type="file" onChange={handleImageChange} />
          </div>

          <div className={styles.rateContainer}>
            <h3>Catégorie liée à l'article</h3>
            <SelectCustom
              label="Sélectionnez la catégorie"
              options={rates}
              valueProp="id"
              labelProp="name"
              minWidth={250}
              onChange={(e) => {
                setSelectedRateId(e.target.value);
              }}
            />
          </div>

          <div className={styles.contentContainer}>
            <h3>Contenu de l'article</h3>
            <TextEditor
              value={newArticle.content}
              onChange={handleEditorChange}
            />
          </div>

          <div className="d-flex justify-content-center">
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
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
        </div>
      ) : (
        <div className={styles.articleDisplay}>
          {articles ? (
            <div>
              <h2 className={styles.title}>Articles</h2>
              <ArticleTable
                articles={articles}
                setArticles={setArticles}
                rates={rates}
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
