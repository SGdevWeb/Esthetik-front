import styles from "./PromotionTable.module.scss";
import { Fragment, useState } from "react";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ModalConfirmation from "../../../../../components/Modal/ModalConfirmation";
import EditPromotion from "../EditPromotion/EditPromotion";
import { formatDate } from "../../../../../utils/formatDate";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { deleteExistingPromotion } from "../../../../../app/slices/promotionSlice";

function PromotionTable() {
  const dispatch = useAppDispatch();
  const promotions = useAppSelector((state) => state.promotions.items);
  const [editingPromotionId, setEditingPromotionId] = useState(null);
  const [promotionIdToDelete, setPromotionIdToDelete] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = (promotionId) => {
    setEditingPromotionId(promotionId);
  };

  const handleCloseModal = () => {
    setShowDeleteConfirmationModal(false);
  };

  const handleDelete = async (promotionIdToDelete) => {
    try {
      await dispatch(deleteExistingPromotion(promotionIdToDelete));

      setShowDeleteConfirmationModal(false);
      setEditingPromotionId(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Erreur lors de la suppression de la promotion : ", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la suppression de la promotion"
      );
    }
  };

  const handleCancelEdit = () => {
    setEditingPromotionId(null);
  };

  const truncateText = (text, maxLength) => {
    const str = text ? String(text) : "";
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  const getSanitizedContent = (content) => {
    const truncateTxt = truncateText(content, 300);
    return DOMPurify.sanitize(truncateTxt);
  };

  return (
    <>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Promotion</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions &&
            promotions.map((promotion) => (
              <Fragment key={promotion.id}>
                <tr>
                  <td>{promotion.title}</td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: getSanitizedContent(promotion.entitled),
                      }}
                    />
                  </td>
                  <td>{formatDate(promotion.start)}</td>
                  <td>{formatDate(promotion.end)}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className={styles.icon}
                      onClick={() => handleEdit(promotion.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={styles.icon}
                      onClick={() => {
                        setPromotionIdToDelete(promotion.id);
                        setShowDeleteConfirmationModal(true);
                      }}
                    />
                  </td>
                </tr>
                {editingPromotionId && editingPromotionId === promotion.id && (
                  <tr>
                    <td colSpan="6">
                      <EditPromotion
                        promotionToEdit={promotions.find(
                          (promotion) => promotion.id === editingPromotionId
                        )}
                        onCancelEdit={handleCancelEdit}
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
        onConfirm={() => handleDelete(promotionIdToDelete)}
      />
    </>
  );
}

export default PromotionTable;
