import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { createNewPromotion } from "../../../../../app/slices/promotionSlice";
import Button from "../../../../../components/Button/Button";
import styles from "./CreatePromotion.module.scss";
import InputCustom from "../../../../../components/InputCustom/InputCustom";
import TextEditor from "../../../../../components/TextEditor/TextEditor";
import { useError } from "../../../../../contexts/ErrorContext";
import SelectCustom from "../../../../../components/SelectCustom/SelectCustom";
import { getRates } from "../../../../../app/slices/rateSlice";

function CreatePromotion({ onClose }) {
  const dispatch = useAppDispatch();
  const { list: rates, loading: ratesLoading } = useAppSelector(
    (state) => state.rates
  );

  const [title, setTitle] = useState("");
  const [entitled, setEntitled] = useState("");
  const [rateId, setRateId] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { errorMessage, setErrorMessage } = useError();

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("entitled", entitled);
      formData.append("description", description);
      formData.append("start", start);
      formData.append("end", end);
      if (image) formData.append("image", image);
      if (rateId) formData.append("rateId", rateId);

      await dispatch(createNewPromotion(formData));
      onClose(); // ferme le formulaire après succès
    } catch (err) {
      console.error("Erreur création promotion : ", err.message);
      setErrorMessage("Impossible de créer la promotion");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.creationPromotionContainer}>
        <h2>Création d'une promotion</h2>

        <div className={styles.titleContainer}>
          <h3>Titre</h3>
          <div style={{ marginBottom: "10px" }}>
            <InputCustom
              value={title}
              placeholder="Titre de la promotion"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.imageContainer}>
          <h3>Image de présentation</h3>
          <input type="file" onChange={handleImageChange} />
        </div>

        <div className={styles.rateContainer}>
          <h3>Catégorie</h3>
          <SelectCustom
            label="Sélectionnez la catégorie"
            options={rates || []}
            value={rateId.toString() || ""}
            valueProp="id"
            labelProp="name"
            minWidth={250}
            onChange={(e) => {
              setRateId(parseInt(e.target.value, 10));
            }}
            disabled={ratesLoading}
          />
        </div>

        <div className={styles.untitledContainer}>
          <h3>Intitulé</h3>
          <div style={{ marginBottom: "10px" }}>
            <InputCustom
              value={entitled}
              placeholder="Intitulé de la promotion"
              onChange={(e) => setEntitled(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.contentContainer}>
          <h3>Contenu de la promotion</h3>
          <TextEditor value={description} onChange={setDescription} />
        </div>

        <div className={styles.dateContainer}>
          <h3>Date de début</h3>
          <div style={{ marginBottom: "10px" }}>
            <InputCustom
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.dateContainer}>
          <h3>Date de fin</h3>
          <div style={{ marginBottom: "10px" }}>
            <InputCustom
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>

      <div className={styles.btnContainer}>
        <Button
          type="submit"
          disabled={loading}
          style={{
            padding: "5px 10px",
            marginLeft: "5px",
            fontSize: "0.8rem",
          }}
          color={"var(--secondary-color)"}
        >
          {loading ? "Création..." : "Créer la promotion"}
        </Button>
        <Button
          type="button"
          onClick={onClose}
          style={{
            padding: "5px 10px",
            marginLeft: "5px",
            fontSize: "0.8rem",
          }}
          color={"var(--secondary-color)"}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}

export default CreatePromotion;
