import React from "react";
import styles from "./AdminPage.module.scss";
import AppointmentList from "../../components/Admin/AppointmentList/AppointmentList";

function AdminHome() {
  return (
    <div className={styles.container}>
      <h1>AdminHome</h1>
      <p>Bienvenue sur votre tableau de bord Administrateur</p>
      <div>
        <AppointmentList />
      </div>
    </div>
  );
}

export default AdminHome;
