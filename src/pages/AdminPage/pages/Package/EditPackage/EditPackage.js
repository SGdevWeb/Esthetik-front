import { useState } from "react";
import InputCustom from "../../../../../components/InputCustom/InputCustom";
import styles from "./EditPackage.module.scss";
import Button from "../../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../../components/Modal/Modal";
import ModalConfirmation from "../../../../../components/Modal/ModalConfirmation";
import { updatePackage } from "../../../../../api/packages";
import { fetchRateIdByName } from "../../../../../api/rates";
import SelectCustom from "../../../../../components/SelectCustom/SelectCustom";

function EditPackage({
  packageToEdit,
  rates,
  onCancelEdit,
  updateLocalPackage,
}) {
  const [editedPackage, setEditedPackage] = useState({ ...packageToEdit });
  const [error, setError] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [newDiscount, setNewDiscount] = useState({ title: "", discount: "" });
  const [discountIdToEdit, setDiscountIdToEdit] = useState(null);
  const [discountIdToDelete, setDiscountIdToDelete] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleSaveModification = async () => {
    try {
      if (!editedPackage.name.trim()) {
        setError("Le nom du forfait ne peut pas être vide.");
        return;
      }

      const rateResponse = await fetchRateIdByName(editedPackage.rate);
      const rateId = rateResponse.data;

      if (!rateId) {
        setError(
          "Catégorie invalide. Veuillez sélectionner une catégorie valide."
        );
        return;
      }

      const updatedPackage = { ...editedPackage, rateId };
      const response = await updatePackage(editedPackage.id, updatedPackage);

      if (response.status === 200) {
        updateLocalPackage(editedPackage);
        onCancelEdit();
      } else {
        setError("Une erreur est survenue lors de la mise à jour du forfait.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du forfait : ", error);
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la modification du forfait."
      );
    }
  };

  const handleCancelModification = () => {
    onCancelEdit();
  };

  const handleEditDiscount = (discountId) => {
    const discountToEdit = editedPackage.discounts.find(
      (discount) => discount.id === discountId
    );
    setNewDiscount({
      title: discountToEdit.title,
      discount: discountToEdit.discount,
    });
    setDiscountIdToEdit(discountId);
    setShowEditModal(true);
  };

  const handleSaveDiscountUpdated = () => {
    const updatedDiscounts = editedPackage.discounts.map((discount) =>
      discount.id === discountIdToEdit
        ? {
            ...discount,
            title: newDiscount.title,
            discount: newDiscount.discount,
          }
        : discount
    );
    setEditedPackage({ ...editedPackage, discounts: updatedDiscounts });
    setShowEditModal(false);
    setNewDiscount({ title: "", discount: "" });
  };

  const handleCancelCreateDiscount = () => {
    setShowEditModal(false);
    setNewDiscount({ title: "", discount: "" });
  };

  const handleDelete = async (discountId) => {
    const updatedDiscounts = editedPackage.discounts.filter(
      (discount) => discount.id !== discountId
    );
    setEditedPackage({ ...editedPackage, discounts: updatedDiscounts });
  };

  const handleCreateDiscount = () => {
    setNewDiscount({ title: "", discount: "" });
    setShowCreateModal(true);
  };

  const handleSaveNewDiscount = () => {
    const updatedDiscounts = [...editedPackage.discounts, newDiscount];
    setEditedPackage({ ...editedPackage, discounts: updatedDiscounts });
    setShowCreateModal(false);
    setNewDiscount({ title: "", discount: "" });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Modification du forfait</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.flex}>
        <div className={styles.packageNameContainer}>
          <h3>Nom du forfait</h3>
          <InputCustom
            id="name"
            name="name"
            value={editedPackage.name}
            onChange={(e) =>
              setEditedPackage({ ...editedPackage, name: e.target.value })
            }
          />
        </div>

        <div className={styles.rateContainer}>
          <h3>Catégorie</h3>
          <SelectCustom
            label="Catégorie"
            options={rates}
            valueProp="name"
            labelProp="name"
            minWidth={200}
            initialValue={editedPackage.rate}
            onChange={(e) =>
              setEditedPackage({ ...editedPackage, rate: e.target.value })
            }
          />
        </div>
        <div className={styles.discountContainer}>
          <h3>Remise(s)</h3>
          {editedPackage.discounts.length > 0 &&
            editedPackage.discounts.map((discount) => (
              <div key={discount.title} className={styles.discountToEdit}>
                <p>
                  {discount.title} : {discount.discount}
                </p>
                <div className={styles.iconBtn}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={styles.icon}
                    onClick={() => handleEditDiscount(discount.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles.icon}
                    onClick={() => {
                      setDiscountIdToDelete(discount.id);
                      setShowDeleteConfirmationModal(true);
                    }}
                  />
                </div>
              </div>
            ))}
          <Button
            style={{
              padding: "7px 15px",
              marginTop: "10px",
              fontSize: "0.8rem",
            }}
            color="var(--secondary-color)"
            onClick={handleCreateDiscount}
          >
            + Ajouter
          </Button>

          <Modal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
          >
            <div className={styles.modalContainer}>
              <h2>Création d'une nouvelle remise</h2>

              <InputCustom
                style={{ marginBottom: "15px" }}
                type="text"
                value={newDiscount.title}
                placeholder="Titre de la remise"
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, title: e.target.value })
                }
              />
              <InputCustom
                type="text"
                value={newDiscount.discount}
                placeholder="Remise"
                onChange={(e) =>
                  setNewDiscount({ ...newDiscount, discount: e.target.value })
                }
              />
            </div>

            <div className={styles.btnContainer}>
              <Button
                style={{
                  padding: "7px 15px",
                  marginRight: "5px",
                  fontSize: "0.8rem",
                }}
                color={"var(--secondary-color)"}
                onClick={handleSaveNewDiscount}
              >
                Créer
              </Button>
              <Button
                style={{
                  padding: "7px 15px",
                  marginRight: "5px",
                  fontSize: "0.8rem",
                }}
                color={"var(--secondary-color)"}
                onClick={() => setShowCreateModal(false)}
              >
                Annuler
              </Button>
            </div>
          </Modal>
        </div>

        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
          <div className={styles.modalContainer}>
            <h2>Modification de la remise</h2>
            <InputCustom
              style={{ marginBottom: "15px" }}
              type="text"
              value={newDiscount.title}
              placeholder="Titre de la remise"
              onChange={(e) => {
                console.log(newDiscount);
                setNewDiscount({ ...newDiscount, title: e.target.value });
              }}
            />
            <InputCustom
              type="text"
              value={newDiscount.discount}
              placeholder="Remise"
              onChange={(e) =>
                setNewDiscount({
                  ...newDiscount,
                  discount: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.btnContainer}>
            <Button
              style={{
                padding: "7px 15px",
                marginRight: "5px",
                fontSize: "0.8rem",
              }}
              color={"var(--secondary-color)"}
              onClick={handleSaveDiscountUpdated}
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
              onClick={handleCancelCreateDiscount}
            >
              Annuler
            </Button>
          </div>
        </Modal>

        <ModalConfirmation
          isOpen={showDeleteConfirmationModal}
          onClose={() => setShowDeleteConfirmationModal(false)}
          message="Êtes-vous sûr de vouloir supprimer cette remise ?"
          onConfirm={() => {
            handleDelete(discountIdToDelete);
            setShowDeleteConfirmationModal(false);
          }}
        />
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
    </div>
  );
}

export default EditPackage;
