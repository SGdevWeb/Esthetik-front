import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import {
  deleteService,
  fetchServicesByRateId,
  updateService,
} from "../../../api/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCheck,
  faUndo,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";
import { toast } from "react-toastify";
import InputCustom from "../../InputCustom/InputCustom";

function Dropdown({
  title,
  rateId,
  layout = "single",
  onEdit,
  onDelete,
  onAdd,
  lastAddedService,
  resetLastAddedService,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteServiceId, setDeleteServiceId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editService, setEditService] = useState({
    id: "",
    title: "",
    price: "",
    rate_id: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (lastAddedService && lastAddedService.rateId === rateId) {
      setServices((prevServices) => {
        // Vérifiez si le service n'existe pas déjà avant de l'ajouter
        if (
          !prevServices.some((service) => service.id === lastAddedService.id)
        ) {
          return [...prevServices, lastAddedService];
        }
        return prevServices;
      });
      // Réinitialisez lastAddedService après l'avoir utilisé
      resetLastAddedService();
    }
  }, [lastAddedService, rateId, resetLastAddedService]);

  useEffect(() => {
    const getServices = async () => {
      if (services.length === 0 && !isLoading) {
        setIsLoading(true);
        try {
          const response = await fetchServicesByRateId(rateId);
          setServices(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des services :", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getServices();
  }, [rateId, isLoading, services.length]);

  const toggleDropdown = async () => {
    setIsOpen(!isOpen);
  };

  function handleDelete(serviceId) {
    setDeleteServiceId(serviceId);
    setIsDeleteModalOpen(true);
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteService(deleteServiceId);
      if (response.status === 200) {
        setServices(
          services.filter((service) => service.id !== deleteServiceId)
        );
        setErrorMessage("");
        toast.success("Prestation supprimée avec succès");
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la prestation :", error);
      toast.error("Erreur lors de la suppression de la prestation");
    }
  };

  const handleEdit = (serviceId) => {
    const serviceToEdit = services.find((service) => service.id === serviceId);
    if (serviceToEdit) {
      setEditService(serviceToEdit);
      setIsEditModalOpen(true);
    }
  };

  const handleEditConfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await updateService(editService.id, editService);
      if (response.status === 200) {
        setServices(
          services.map((service) =>
            service.id === editService.id ? editService : service
          )
        );
        setErrorMessage("");
        toast.success("Prestation modifiée");
      } else {
        setErrorMessage("Erreur lors de la modification de la prestation.");
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la modification de la prestation : " + error.message
      );
    } finally {
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <span>{title}</span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className={`${styles.arrow} fa-md`}
        />
      </div>
      {isOpen && (
        <div className={styles.content}>
          <div
            className={`${styles.dropdownDescription} ${
              layout === "double" ? styles.doubleColumn : ""
            }`}
          >
            {services.map((service, index) => (
              <PrestationCard
                key={index}
                title={service.title}
                price={service.price}
                style={{ marginLeft: "50px" }}
                onEdit={() => handleEdit(service.id)}
                onDelete={() => handleDelete(service.id)}
              />
            ))}
            {isAdminPath && (
              <div className={styles.btnContainer}>
                <Button
                  onClick={onAdd}
                  color="var(--primary-color)"
                  style={{
                    padding: "7px 15px",
                    fontSize: "0.8rem",
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-10" />
                  Ajouter une prestation
                </Button>
              </div>
            )}
          </div>
          {isAdminPath && (
            <div className={styles.adminButton}>
              <Button
                onClick={onEdit}
                color="var(--secondary-color)"
                style={{
                  padding: "7px 15px",
                  fontSize: "0.8rem",
                }}
              >
                Modifier
              </Button>
              <Button
                onClick={onDelete}
                color="var(--secondary-color)"
                style={{
                  padding: "7px 15px",
                  fontSize: "0.8rem",
                }}
              >
                Supprimer
              </Button>
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className={styles.modalContent}>
          <h3>Suppression d'une prestation</h3>
          <p>Êtes-vous sûr de vouloir supprimer cette prestation ?</p>
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
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Modification de la prestation</h3>
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
                  value={editService.title}
                  onChange={(e) =>
                    setEditService({ ...editService, title: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.inputStyle}>
                <div style={{ height: "5px" }}>
                  <label htmlFor="price">Prix</label>
                </div>
                <InputCustom
                  type="text"
                  id="price"
                  placeholder="Prix"
                  value={editService.price}
                  onChange={(e) =>
                    setEditService({ ...editService, price: e.target.value })
                  }
                />
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
                onClick={() => setIsEditModalOpen(false)}
              >
                <FontAwesomeIcon icon={faUndo} className="mr-10" />
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Dropdown;
