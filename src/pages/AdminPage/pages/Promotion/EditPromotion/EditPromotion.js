import { useEffect, useRef, useState } from "react";
import styles from "./EditPromotion.module.scss";
import InputCustom from "../../../../../components/InputCustom/InputCustom";
import SelectCustom from "../../../../../components/SelectCustom/SelectCustom";
import Button from "../../../../../components/Button/Button";
import { updateExistingPromotion } from "../../../../../app/slices/promotionSlice";
import TextEditor from "../../../../../components/TextEditor/TextEditor";
import Modal from "../../../../../components/Modal/Modal";
import { getRates } from "../../../../../app/slices/rateSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";

const apiUrl = process.env.REACT_APP_API_URL;

function toInputDateValue(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function EditPromotion({ promotionToEdit, onCancelEdit }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.promotions);
  const { list: rates, loading: ratesLoading } = useAppSelector(
    (state) => state.rates
  );

  const [editedPromotion, setEditedPromotion] = useState({
    ...promotionToEdit,
    start: toInputDateValue(promotionToEdit.start),
    end: toInputDateValue(promotionToEdit.end),
  });

  const initialPromotion = useRef({ ...promotionToEdit });

  const [errorMessage, setErrorMessage] = useState("");
  const [showModalImageModification, setShowModalImageModification] =
    useState(false);
  const [selectedPresentationPhoto, setSelectedPresentationPhoto] =
    useState(null);
  const [imagePreview, setImagePreview] = useState(
    `${apiUrl}/uploads/${editedPromotion.picture}`
  );

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch]);

  const handleCancelModification = () => {
    onCancelEdit();
  };

  const handleEditorChange = (content) => {
    setEditedPromotion((prevPromotion) => ({
      ...prevPromotion,
      description: content,
    }));
  };

  const handleSavePresentationPhoto = () => {
    if (selectedPresentationPhoto) {
      setImagePreview(URL.createObjectURL(selectedPresentationPhoto));
    }
    setShowModalImageModification(false);
  };
  const handleCancelModalPresentation = () => {
    setShowModalImageModification(false);
    setSelectedPresentationPhoto(null);
    setImagePreview(`${apiUrl}/uploads/${editedPromotion.picture}`);
  };

  const buildPatchData = () => {
    const formData = new FormData();

    if (editedPromotion.title !== initialPromotion.current.title)
      formData.append("title", editedPromotion.title);

    if (editedPromotion.entitled !== initialPromotion.current.entitled)
      formData.append("entitled", editedPromotion.entitled);

    if (editedPromotion.description !== initialPromotion.current.description)
      formData.append("description", editedPromotion.description);

    if (editedPromotion.start !== initialPromotion.current.start)
      formData.append("start", editedPromotion.start);

    if (editedPromotion.end !== initialPromotion.current.end)
      formData.append("end", editedPromotion.end);

    if (editedPromotion.rate_id !== initialPromotion.current.rate_id)
      formData.append("rateId", editedPromotion.rate_id);

    if (selectedPresentationPhoto) {
      formData.append("image", selectedPresentationPhoto);
      formData.append("oldImage", initialPromotion.current.picture);
    }

    return formData;
  };

  const handleSaveModification = async () => {
    try {
      if (!editedPromotion.title.trim()) {
        setErrorMessage("Le titre de la promotion ne peut pas être vide");
        return;
      }

      if (!editedPromotion.rate_id) {
        setErrorMessage(
          "Catégorie invalide. Veuillez sélectionner une catégorie valide"
        );
        return;
      }

      const patchData = buildPatchData();

      if (patchData.entries().next().done) {
        setErrorMessage("Aucune modification à enregistrer");
        return;
      }

      await dispatch(updateExistingPromotion(editedPromotion.id, patchData));

      onCancelEdit();
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      setErrorMessage("Une erreur est survenue lors de la modification");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Modification de la promotion</h2>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <div>
        <div className="d-flex">
          <div className={styles.flex2}>
            <div className={styles.promoTitleContainer}>
              <h3>Titre de la promotion</h3>
              <InputCustom
                value={editedPromotion.title}
                onChange={(e) =>
                  setEditedPromotion({
                    ...editedPromotion,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.rateContainer}>
              <h3>Catégorie</h3>
              {ratesLoading ? (
                <p>Chargement des catégpries...</p>
              ) : (
                <SelectCustom
                  label="Catégorie"
                  options={rates || []}
                  valueProp="id"
                  labelProp="name"
                  minWidth={250}
                  initialValue={
                    rates.some((r) => r.id === editedPromotion.rate_id)
                      ? editedPromotion.rate_id.toString()
                      : ""
                  }
                  onChange={(e) =>
                    setEditedPromotion({
                      ...editedPromotion,
                      rate_id: parseInt(e.target.value, 10),
                    })
                  }
                />
              )}
            </div>

            <div className={styles.entitledContainer}>
              <h3>Intitulé</h3>
              <InputCustom
                value={editedPromotion.entitled}
                onChange={(e) =>
                  setEditedPromotion({
                    ...editedPromotion,
                    entitled: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className={styles.flex1}>
            <div className={styles.imageContainer}>
              <img src={imagePreview} alt="Bannière de la promotion" />
              <div
                className={styles.overlay}
                onClick={() => setShowModalImageModification(true)}
              >
                <span>Modifier la photo</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.promoContentContainer}>
          <h3>Description</h3>
          <TextEditor
            value={editedPromotion.description}
            onChange={handleEditorChange}
          />
        </div>

        <div className={styles.dateContainer}>
          <h3>Date de début</h3>
          <InputCustom
            type="date"
            value={editedPromotion.start}
            onChange={(e) =>
              setEditedPromotion({ ...editedPromotion, start: e.target.value })
            }
          />
        </div>
        <div className={styles.dateContainer}>
          <h3>Date de fin</h3>
          <InputCustom
            type="date"
            value={editedPromotion.end}
            onChange={(e) =>
              setEditedPromotion({ ...editedPromotion, end: e.target.value })
            }
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
          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
        <Button
          style={{ padding: "7px 15px", fontSize: "0.8rem" }}
          color={"var(--secondary-color)"}
          onClick={handleCancelModification}
        >
          Annuler
        </Button>
      </div>

      {showModalImageModification && (
        <Modal
          isOpen={showModalImageModification}
          onClose={handleCancelModalPresentation}
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

export default EditPromotion;
