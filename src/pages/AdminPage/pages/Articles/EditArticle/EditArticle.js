import { useState } from "react";
import styles from "./EditArticle.module.scss";
import InputCustom from "../../../../../components/InputCustom/InputCustom";
import SelectCustom from "../../../../../components/SelectCustom/SelectCustom";
import Button from "../../../../../components/Button/Button";
import { updateArticle } from "../../../../../api/articles";
import TextEditor from "../../../../../components/TextEditor/TextEditor";
import Modal from "../../../../../components/Modal/Modal";

const apiUrl = process.env.REACT_APP_API_URL;

function EditArticle({ articleToEdit, onCancelEdit, setArticles, rates }) {
  const [editedArticle, setEditedArticle] = useState({ ...articleToEdit });
  const [errorMessage, setErrorMessage] = useState("");
  const [showModalImageModification, setShowModalImageModification] =
    useState(false);
  const [selectedPresentationPhoto, setSelectedPresentationPhoto] =
    useState(null);
  const [imagePreview, setImagePreview] = useState(
    `${apiUrl}/uploads/${editedArticle.image}`
  );

  console.log(articleToEdit);

  const handleCancelModification = () => {
    onCancelEdit();
  };

  const handleSaveModification = async () => {
    try {
      if (!editedArticle.title.trim()) {
        setErrorMessage("Le titre de l'article ne peut pas être vide");
        return;
      }

      if (!editedArticle.rate_id) {
        setErrorMessage(
          "Catégorie invalide. Veuillez sélectionner une catégorie valide"
        );
        return;
      }

      const formData = new FormData();

      console.log(selectedPresentationPhoto);

      if (selectedPresentationPhoto) {
        formData.append("image", selectedPresentationPhoto);
        formData.append("imageCategory", "article");
        formData.append("oldImage", editedArticle.image);
      }

      formData.append("title", editedArticle.title);
      formData.append("rateId", editedArticle.rate_id);
      formData.append("content", editedArticle.content);

      console.log(formData);

      const response = await updateArticle(editedArticle.id, formData);

      if (response.status === 200) {
        const updatedArticle = response.data;
        console.log(updatedArticle);

        setArticles((prevArticles) => {
          const articleIndex = prevArticles.findIndex(
            (article) => article.id === updatedArticle.id
          );
          if (articleIndex !== -1) {
            const updatedArticles = [...prevArticles];
            updatedArticles[articleIndex] = updatedArticle;

            return updatedArticles;
          }

          return prevArticles;
        });

        onCancelEdit();
      } else {
        setErrorMessage(
          "Une Erreur est survenue lors de la mise à jour de l'article"
        );
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'article : ", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la modification de l'article"
      );
    }
  };

  const handleEditorChange = (content) => {
    console.log("Content changed:", content);
    setEditedArticle((prevArticle) => ({
      ...prevArticle,
      content,
    }));
  };

  const handleSavePresentationPhoto = () => {
    setImagePreview(URL.createObjectURL(selectedPresentationPhoto));
    setShowModalImageModification(false);
  };

  const handleCancelModalPresentation = () => {
    setShowModalImageModification(false);
    setSelectedPresentationPhoto(null);
    setImagePreview(`${apiUrl}/uploads/${editedArticle.image}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Modification de l'article</h2>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <div>
        <div className="d-flex">
          <div className={styles.flex2}>
            <div className={styles.articleTitleContainer}>
              <h3>Titre de l'article</h3>
              <InputCustom
                id="title"
                name="title"
                value={editedArticle.title}
                onChange={(e) =>
                  setEditedArticle({ ...editedArticle, title: e.target.value })
                }
              />
            </div>
            <div className={styles.rateContainer}>
              <h3>Catégorie</h3>
              <SelectCustom
                label="Catégorie"
                options={rates}
                valueProp="id"
                labelProp="name"
                minWidth={250}
                initialValue={editedArticle.rate_id}
                onChange={(e) =>
                  setEditedArticle({
                    ...editedArticle,
                    rate_id: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={styles.flex1}>
            <div className={styles.imageContainer}>
              <img src={imagePreview} alt="Bannière de l'article" />
              <div
                className={styles.overlay}
                onClick={() => setShowModalImageModification(true)}
              >
                <span>Modifier la photo</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.articleContentContainer}>
          <h3>Contenu de l'article</h3>
          <TextEditor
            value={editedArticle.content}
            onChange={handleEditorChange}
          />
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Button
          style={{
            padding: "7px 15px",
            marginRight: "5px",
            fontSize: "0.8rem",
          }}
          color={"var(--secondary-color)"}
          onClick={handleSaveModification}
        >
          Enregistrer les modifications
        </Button>
        <Button
          style={{
            padding: "7px 15px",
            marginRight: "5px",
            fontSize: "0.8rem",
          }}
          color={"var(--secondary-color)"}
          onClick={handleCancelModification}
        >
          Annuler
        </Button>
      </div>

      {showModalImageModification && (
        <Modal
          isOpen={showModalImageModification}
          onClose={() => setShowModalImageModification(false)}
        >
          <div className={styles.modalPresentationContainer}>
            <h2 className={styles.heading2}>Modification de la photo</h2>
            <div className={styles.inputContainer}>
              <label>Nouvelle photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedPresentationPhoto(e.target.files[0])
                }
              />
            </div>

            {errorMessage && <p>{errorMessage}</p>}

            <div className={styles.btnContainerModal}>
              <Button
                style={{
                  padding: "7px 15px",
                  marginRight: "5px",
                  fontSize: "0.8rem",
                }}
                color={"var(--secondary-color)"}
                onClick={handleSavePresentationPhoto}
              >
                Enregistrer
              </Button>
              <Button
                style={{
                  padding: "7px 15px",
                  marginRight: "5px",
                  fontSize: "0.8rem",
                }}
                color={"var(--secondary-color)"}
                onClick={handleCancelModalPresentation}
              >
                Annuler
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EditArticle;
