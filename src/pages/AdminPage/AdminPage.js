import React, { useEffect } from "react";
import styles from "./AdminPage.module.scss";
import { usePageTitle } from "../../contexts/PageTitleContext";
import VisitsChart from "../../components/Matomo/VisitsChart/VisitsChart";

function AdminHome() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Tableau de bord");
  }, [setPageTitle]);

  return (
    <div className={styles.container}>
      <p>Bienvenue sur votre tableau de bord Administrateur</p>
      <VisitsChart />
    </div>
  );
}

export default AdminHome;
