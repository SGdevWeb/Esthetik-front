import React, { useEffect, useState } from "react";
import styles from "./Location.module.scss";
import { fetchLocations, newLocation } from "../../../../api/locations";
import InputCustom from "../../../../components/InputCustom/InputCustom";
import Button from "../../../../components/Button/Button";
import { deleteLocation } from "../../../../api/locations";

function Location() {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [showAddSection, setShowAddSection] = useState(false);

  useEffect(() => {
    const getLocations = async () => {
      const locations = await fetchLocations();
      setLocations(locations);
    };
    getLocations();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await newLocation({ name: location });
      console.log("response", response);
      if (response.status === 201) {
        setLocations((prevLocations) => [...prevLocations, response.data]);
        setLocation("");
        setErrorMessage("");
      } else {
        console.log("response", response);
        const { message } = response.data;
        setErrorMessage("Erreur lors de la création de la ville : " + message);
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la création de la ville : " + error.message
      );
    }
  }

  async function handleDelete(locationId) {
    try {
      const response = await deleteLocation(locationId);
      if (response.status === 200) {
        setLocations(
          locations.filter((location) => location.id !== locationId)
        );
        setErrorMessage("");
      } else {
        setErrorMessage("Erreur lors de la suppression de la ville.");
      }
    } catch (error) {
      setErrorMessage(
        "Erreur lors de la suppression de la ville : " + error.message
      );
    }
  }

  async function handleEdit(locationId) {
    console.log("Id de la ville à modifer", locationId);
  }

  return (
    <div className={styles.container}>
      <h1>Secteur d'activité</h1>
      <section className={styles.all}>
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
                <td>{location.name}</td>
                <td>
                  <Button
                    color="#f44336"
                    onClick={() => handleDelete(location.id)}
                  >
                    Supprimer
                  </Button>
                  <Button
                    color="#ffca28"
                    onClick={() => handleEdit(location.id)}
                  >
                    Modifier
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!showAddSection && (
          <p
            color="var(--primary-color)"
            onClick={() => setShowAddSection(true)}
          >
            {showAddSection ? "Annuler" : "Ajouter une ville"}
          </p>
        )}
      </section>
      {showAddSection && (
        <section className={styles.add}>
          <form>
            <div onClick={() => setShowAddSection(false)}>X</div>
            <InputCustom
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Entrer une nouvelle ville"
            />
            <div className={styles.btn}>
              <Button
                type="submit"
                color="var(--primary-color)"
                onClick={handleSubmit}
              >
                Ajouter
              </Button>
            </div>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </section>
      )}
    </div>
  );
}

export default Location;
