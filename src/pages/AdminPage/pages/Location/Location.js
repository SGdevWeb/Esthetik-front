import React, { useEffect, useState } from "react";
import styles from "./Location.module.scss";
import {
  fetchLocations,
  newLocation,
  updateLocation,
} from "../../../../api/locations";
import InputCustom from "../../../../components/InputCustom/InputCustom";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import { deleteLocation } from "../../../../api/locations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Location() {
  // Data
  const [locations, setLocations] = useState([]);

  // States to add
  const [location, setLocation] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // States to edit
  const [editLocation, setEditLocation] = useState("");
  const [editLocationId, setEditLocationId] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // States to delete
  const [deleteLocationId, setDeleteLocationId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getLocations = async () => {
      const locations = await fetchLocations();
      const formattedLocations = locations.map((location) => ({
        ...location,
        name: location.name
          .split(/(\s|-)/) // Sépare sur les espaces ou les tirets tout en gardant les délimiteurs
          .map((part) => {
            if (part === " " || part === "-") {
              return part;
            } else {
              return part.charAt(0).toUpperCase() + part.slice(1);
            }
          })
          .join(""),
      }));
      setLocations(formattedLocations);
    };
    getLocations();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await newLocation({ name: location });
      if (response.status === 201) {
        setLocations((prevLocations) => [...prevLocations, response.data]);
        setLocation("");
        setErrorMessage("");
        setIsAddModalOpen(false);
        toast.success("Ville ajoutée à votre secteur d'activité");
      } else {
        const { message } = response.data;
        setErrorMessage("Erreur lors de la création de la ville : " + message);
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la création de la ville : " + error.message
      );
    }
  }

  function handleDelete(locationId) {
    setDeleteLocationId(locationId);
    setIsDeleteModalOpen(true);
  }

  async function handleDeleteConfirm() {
    try {
      const response = await deleteLocation(deleteLocationId);
      if (response.status === 200) {
        setLocations(
          locations.filter((location) => location.id !== deleteLocationId)
        );
        setErrorMessage("");
        toast.success("Ville supprimée de votre secteur d'activité");
      } else {
        setErrorMessage("Erreur lors de la suppression de la ville.");
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la suppression de la ville : " + error.message
      );
    } finally {
      setIsDeleteModalOpen(false);
    }
  }

  async function handleEdit(locationId) {
    const locationToEdit = locations.find(
      (location) => location.id === locationId
    );
    if (locationToEdit) {
      setEditLocation(locationToEdit.name);
      setEditLocationId(locationId);
      setIsEditModalOpen(true);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const response = await updateLocation(editLocationId, {
        name: editLocation,
      });
      if (response.status === 200) {
        const updatedLocations = locations.map((location) =>
          location.id === editLocationId
            ? { ...location, name: editLocation }
            : location
        );
        setLocations(updatedLocations);

        setEditLocation("");
        setIsEditModalOpen(false);
        setErrorMessage("");
      } else {
        const { message } = response.data;
        setErrorMessage(
          "Erreur lors de la modification de la ville : " + message
        );
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la modification de la ville");
    }

    setEditLocation("");
    setIsEditModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <h1>Secteur d'activité</h1>
      <section className={styles.tableSection}>
        <table>
          <thead>
            <tr>
              <th>Ville</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td className={styles.locationName}>{location.name}</td>
                <td className="d-flex">
                  <div className="mr-10">
                    <Button
                      color="var(--secondary-color)"
                      onClick={() => handleEdit(location.id)}
                    >
                      <FontAwesomeIcon icon={faPencil} className="mr-10" />
                      Modifier
                    </Button>
                  </div>
                  <div>
                    <Button
                      color="var(--secondary-color)"
                      onClick={() => handleDelete(location.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="mr-10" />
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className={styles.addSection}>
        <Button
          color="var(--primary-color)"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-10" />
          Ajouter une ville
        </Button>
      </section>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className={styles.modalContent}>
          <h3>Ajouter une ville au secteur d'activité</h3>
          <div>
            <InputCustom
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Entrer une nouvelle ville"
            />
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
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className={styles.modalContent}>
          <h3>Modifier la ville</h3>
          <div>
            <InputCustom
              type="text"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              placeholder="Modifier le nom de la ville"
            />
          </div>
          <div className={styles.btn}>
            <Button
              type="submit"
              color="var(--secondary-color)"
              onClick={handleEditSubmit}
            >
              Mettre à jour
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className={styles.modalContent}>
          <h3>Suppression d'une ville du secteur d'activité</h3>
          <p>Êtes-vous sûr de vouloir supprimer cette ville ?</p>
          <div className={styles.buttons}>
            <Button
              color="var(--secondary-color)"
              onClick={handleDeleteConfirm}
            >
              Supprimer
            </Button>
            <Button
              color="var(--secondary-color)"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Location;
