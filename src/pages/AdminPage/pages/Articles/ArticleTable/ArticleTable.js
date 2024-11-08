import styles from "./ArticleTable.module.scss";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import EditArticle from "../EditArticle/EditArticle";
import ModalConfirmation from "../../../../../components/Modal/ModalConfirmation";
import { deleteArticle } from "../../../../../api/articles";
import DOMPurify from "dompurify";

function ArticleTable({ articles, setArticles, rates }) {
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = (articleId) => {
    setEditingArticleId(articleId);
  };

  const handleCancelEdit = () => {
    setEditingArticleId(null);
  };

  const handleCloseModal = () => {
    setShowDeleteConfirmationModal(false);
  };

  const handleDelete = async (articleIdToDelete) => {
    try {
      const response = await deleteArticle(articleIdToDelete);

      if (response.status === 200) {
        const updatedArticles = articles.filter(
          (article) => article.id !== articleIdToDelete
        );

        setArticles(updatedArticles);

        setShowDeleteConfirmationModal(false);
        setEditingArticleId(null);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article : ", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la suppression de l'article"
      );
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const getSanitizedContent = (content) => {
    const truncateTxt = truncateText(content, 300);
    return DOMPurify.sanitize(truncateTxt);
  };

  console.log(articles);

  return (
    <>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Titre</th>
            <th className={styles.content}>Contenu</th>
            <th>Date de publication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles &&
            articles.map((article) => (
              <Fragment key={article.id}>
                <tr>
                  <td>{article.title}</td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: getSanitizedContent(article.content),
                      }}
                    />
                  </td>
                  <td>
                    {format(
                      new Date(article.publication_date),
                      "dd MMMM yyyy",
                      { locale: fr }
                    )}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className={styles.icon}
                      onClick={() => handleEdit(article.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={styles.icon}
                      onClick={() => {
                        setArticleIdToDelete(article.id);
                        setShowDeleteConfirmationModal(true);
                      }}
                    />
                  </td>
                </tr>
                {editingArticleId && editingArticleId === article.id && (
                  <tr>
                    <td colSpan="6">
                      <EditArticle
                        articleToEdit={articles.find(
                          (article) => article.id === editingArticleId
                        )}
                        onCancelEdit={handleCancelEdit}
                        setArticles={setArticles}
                        rates={rates}
                      />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
        </tbody>
      </table>

      <ModalConfirmation
        isOpen={showDeleteConfirmationModal}
        onClose={handleCloseModal}
        message="Êtes-vous sûr de vouloir supprimer cet article ?"
        onConfirm={() => handleDelete(articleIdToDelete)}
      />
    </>
  );
}

export default ArticleTable;
