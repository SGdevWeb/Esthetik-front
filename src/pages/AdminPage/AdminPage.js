import React from "react";
import styles from "./AdminPage.module.scss";
import RepetitiveSlots from "../../components/Admin/RepetitiveSlots/RepetitiveSlots";
import AppointmentList from "../../components/Admin/AppointmentList/AppointmentList";

function AdminHome() {
  return (
    <div className={styles.container}>
      <h1>AdminHome</h1>
      <div>
        <RepetitiveSlots />
      </div>
      <div>
        <AppointmentList />
      </div>
    </div>
  );
}

export default AdminHome;
