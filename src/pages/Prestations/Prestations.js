import React from "react";
import styles from "./Prestations.module.scss";
import Navigation from "../../components/Prestations/Navigation/Navigation";

function Prestations() {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <Navigation />
      </nav>
      <div className={styles.content}>Content</div>
    </div>
  );
}

export default Prestations;
