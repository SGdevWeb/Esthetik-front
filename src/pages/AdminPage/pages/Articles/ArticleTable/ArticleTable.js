import styles from "./ArticleTable.module.scss";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import EditArticle from "../EditArticle/EditArticle";
import ModalConfirmation from "../../../../../components/Modal/ModalConfirmation";

function ArticleTable({ articlesData, setArticlesData }) {
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const handleEdit = (articleId) => {
    setEditingArticleId(articleId);
  };

  const handleCloseModal = () => {
    setShowDeleteConfirmationModal(false);
  };

  const handleDelete = async (articleIdToDelete) => {
    console.log("id de l'article à supprimer", articleIdToDelete);
    setShowDeleteConfirmationModal(false);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
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
          {articlesData &&
            articlesData.map((article) => (
              <Fragment key={article.id}>
                <tr>
                  <td>{article.title}</td>
                  <td>{truncateText(article.content, 300)}</td>
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
                      <EditArticle />
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
        message="Êtes-vous sûr de vouloir supprimer cet article"
        onConfirm={() => handleDelete(articleIdToDelete)}
      />
    </>
  );
}

export default ArticleTable;
