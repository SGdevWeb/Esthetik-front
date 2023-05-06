import React, { useState } from "react";
import styles from "./Location.module.scss";

function Location() {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const secteur = ["saint-saulve", "valenciennes", "marly"];

  function handleChange(e) {
    console.log("change");
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setError("Merci de remplir ce champs");
    } else {
      setError("");
    }
  }

  function compareCity(e) {
    e.preventDefault();
    console.log(e.target.elements.ville.value.toLowerCase());
    const city = e.target.elements.ville.value.trim().toLowerCase();

    if (city === "") {
      setError("Merci de remplir ce champs");
    }
    if (secteur.includes(city)) {
      setMessage("Virginie peut se déplacer chez vous");
    } else {
      setMessage("Votre domicile ne fait pas parti du secteur de Virginie");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={compareCity}>
        <input
          onChange={handleChange}
          className={styles.input}
          type="text"
          id="ville"
          placeholder="Ou habitez-vous ?"
          name="ville"
          value={inputValue}
        />
        {error && <small className={styles.error}>{error}</small>}
        <button type="submit">Valider</button>
      </form>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default Location;
