import React, { useEffect } from "react";
import styles from "./AdminPage.module.scss";
import { usePageTitle } from "../../contexts/PageTitleContext";

function AdminHome() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Tableau de bord");
  }, [setPageTitle]);

  return (
    <div className={styles.container}>
      <p>Bienvenue sur votre tableau de bord Administrateur</p>
    </div>
  );
}

export default AdminHome;
