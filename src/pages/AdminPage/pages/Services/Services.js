import React, { useEffect, useState } from "react";
import styles from "./Services.module.scss";
import { usePageTitle } from "../../../../contexts/PageTitleContext";
import {
  addRate,
  deleteRate,
  fetchRates,
  updateRate,
} from "../../../../api/rates";
import Dropdown from "../../../../components/Prestations/Dropdown/Dropdown";
import Modal from "../../../../components/Modal/Modal";
import Button from "../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faUndo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import InputCustom from "../../../../components/InputCustom/InputCustom";
import { addService } from "../../../../api/services";

function Services() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Prestations");
  }, [setPageTitle]);

  const [rates, setRates] = useState([]);
  const [deleteRateId, setdeleteRateId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRateData, setEditRateData] = useState({
    id: "",
    name: "",
    description: "",
    img_name: "",
    img_title: "",
  });
  const [newRateData, setNewRateData] = useState({
    name: "",
    img_name: "",
    img_title: "",
    description: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newServiceData, setNewServiceData] = useState({
    title: "",
    price: "",
    rate_id: "",
  });
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [lastAddedService, setLastAddedService] = useState(null);

  useEffect(() => {
    const fetchRatesData = async () => {
      try {
        const response = await fetchRates();
        setRates(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tarifs : ", error);
        setErrorMessage(
          "Impossible de charger les tarifs. Veuillez réessayer plus tard"
        );
      }
    };

    fetchRatesData();
  }, []);

  const handleDelete = (rateId) => {
    setdeleteRateId(rateId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteRate(deleteRateId);
      if (response.status === 200) {
        setRates(rates.filter((rate) => rate.id !== deleteRateId));
        setErrorMessage("");
        toast.success("Type de prestation supprimée");
      } else {
        setErrorMessage("Erreur lors de la suppression du type de prestation.");
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la suppression du type de prestation : " + error.message
      );
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleEdit = (rateId) => {
    const rateToEdit = rates.find((rate) => rate.id === rateId);
    if (rateToEdit) {
      setEditRateData(rateToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleEditConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRate(editRateData.id, editRateData);
      if (response.status === 200) {
        setRates(
          rates.map((rate) =>
            rate.id === editRateData.id ? editRateData : rate
          )
        );
        setErrorMessage("");
        toast.success("Type de prestation modifiée");
      } else {
        setErrorMessage(
          "Erreur lors de la modification du type de prestation."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la modification du type de prestation : " +
          error.message
      );
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleCancelEdit = async (e) => {
    e.preventDefault();
    console.log("cancel");
    setIsEditModalOpen(false);
  };

  const handleAddService = (rateId) => {
    console.log(rateId);
    setIsAddServiceModalOpen(true);
    setNewServiceData({ ...newServiceData, rate_id: rateId });
  };

  const handleSubmitNewService = async (e) => {
    e.preventDefault();
    try {
      console.log(newServiceData);
      const response = await addService(newServiceData);
      if (response.status === 201) {
        const newService = response.data;
        setLastAddedService({ ...newService, rateId: newServiceData.rate_id });
        setNewServiceData({ title: "", price: "", rate_id: "" });
        toast.success("Nouveau service ajouté avec succès");
        setIsAddServiceModalOpen(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du service :", error);
      toast.error("Erreur lors de l'ajout du service");
    }
  };

  const handleCloseAddServiceModal = () => {
    setIsAddServiceModalOpen(false);
    setNewServiceData({ title: "", price: "", rate_id: "" });
    setLastAddedService(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addRate(newRateData);
      if (response.status === 201) {
        const newRate = response.data;
        setRates([...rates, newRate]);
        setNewRateData({
          name: "",
          img_name: "",
          img_title: "",
          description: "",
        });
        setErrorMessage("");
        setIsAddModalOpen(false);
        toast.success("Nouveau type de prestation ajouté");
      } else {
        setErrorMessage(
          `Erreur lors de la création du nouveau type de prestation : ${response.data.message}`
        );
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la création du type de prestation : " + error.message
      );
    }
  };

  const resetLastAddedService = () => {
    setLastAddedService(null);
  };

  return (
    <div className={styles.container}>
      <section className={styles.ratesDisplay}>
        {rates.map((rate, index) => (
          <Dropdown
            key={index}
            title={rate.name}
            rateId={rate.id}
            layout="double"
            onEdit={() => handleEdit(rate.id)}
            onDelete={() => handleDelete(rate.id)}
            onAdd={() => handleAddService(rate.id)}
            lastAddedService={lastAddedService}
            resetLastAddedService={resetLastAddedService}
          />
        ))}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <div className={styles.modalContent}>
            <h3>Suppression d'un type de prestation</h3>
            <p>Êtes-vous sûr de vouloir supprimer ce type de prestation ?</p>
            <div className={styles.buttons}>
              <Button
                color="var(--secondary-color)"
                onClick={handleDeleteConfirm}
              >
                <FontAwesomeIcon icon={faCheck} className="mr-10" />
                Confirmer
              </Button>
              <Button
                color="var(--secondary-color)"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                <FontAwesomeIcon icon={faUndo} className="mr-10" />
                Annuler
              </Button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>
              Modification du type de prestation
            </h3>
            <form onSubmit={handleEditConfirm}>
              <div className={styles.formGroup}>
                <div className={styles.inputStyle}>
                  <div style={{ height: "5px" }}>
                    <label htmlFor="name">Nom</label>
                  </div>
                  <InputCustom
                    type="text"
                    id="name"
                    placeholder="Nom"
                    value={editRateData.name}
                    onChange={(e) =>
                      setEditRateData({ ...editRateData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.inputStyle}>
                  <div style={{ height: "0" }}>
                    <label htmlFor="description">Description</label>
                  </div>
                  <textarea
                    id="description"
                    value={editRateData.description}
                    onChange={(e) =>
                      setEditRateData({
                        ...editRateData,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <div className={styles.buttons}>
                <Button color="var(--secondary-color)" type="submit">
                  <FontAwesomeIcon icon={faCheck} className="mr-10" />
                  Confirmer
                </Button>
                <Button
                  type="button"
                  color="var(--secondary-color)"
                  onClick={handleCancelEdit}
                >
                  <FontAwesomeIcon icon={faUndo} className="mr-10" />
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <div className={styles.modalContent}>
            <h3>Ajouter un type de prestation</h3>
            <div style={{ marginBottom: "30px" }}>
              <InputCustom
                type="text"
                value={newRateData.name}
                onChange={(e) =>
                  setNewRateData({ ...newRateData, name: e.target.value })
                }
                placeholder="Entrer un nouveau type de prestation"
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.inputStyle}>
                <div style={{ height: "0" }}>
                  <label htmlFor="description">Description</label>
                </div>
                <textarea
                  id="description"
                  value={newRateData.description}
                  onChange={(e) =>
                    setNewRateData({
                      ...newRateData,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
            <div className={styles.btn}>
              <Button
                type="submit"
                color="var(--secondary-color)"
                onClick={handleSubmit}
              >
                Valider
              </Button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </Modal>
        <Modal
          isOpen={isAddServiceModalOpen}
          onClose={handleCloseAddServiceModal}
        >
          <div className={styles.modalContent}>
            <h3>Ajouter une prestation</h3>
            <div style={{ marginBottom: "15px" }}>
              <InputCustom
                type="text"
                value={newServiceData.title}
                onChange={(e) =>
                  setNewServiceData({
                    ...newServiceData,
                    title: e.target.value,
                  })
                }
                placeholder="Nom"
              />
            </div>
            <div>
              <InputCustom
                type="text"
                value={newServiceData.price}
                onChange={(e) =>
                  setNewServiceData({
                    ...newServiceData,
                    price: e.target.value,
                  })
                }
                placeholder="Prix"
              />
            </div>
            <div className={styles.btn}>
              <Button
                type="submit"
                color="var(--secondary-color)"
                onClick={handleSubmitNewService}
              >
                Valider
              </Button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </Modal>
      </section>
      <section className={styles.addRate}>
        <Button
          color="var(--primary-color)"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-10" />
          Ajouter un nouveau type de prestation
        </Button>
      </section>
    </div>
  );
}

export default Services;
