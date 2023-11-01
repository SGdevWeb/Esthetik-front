import {
  confirmAppointment,
  fetchAppointmentsDetails,
} from "../../../api/appointment";
import styles from "./AppointmentList.module.scss";
import React, { useState, useEffect } from "react";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAppointmentsDetails();

      if (response.status !== 200) {
        console.error(
          "Erreur lors de la récupération des rendez-vous : ",
          response.statusText
        );
        return;
      }

      if (response.data && response.data.length) {
        const groupedAppointments = {};

        response.data.forEach((appointment) => {
          const { appointment_id, prestation, type_de_prestation, ...rest } =
            appointment;

          if (!groupedAppointments[appointment_id]) {
            groupedAppointments[appointment_id] = {
              appointment_id,
              ...rest,
              prestations: [
                {
                  type: type_de_prestation,
                  prestation: prestation,
                },
              ],
            };
          } else {
            groupedAppointments[appointment_id].prestations.push({
              type: type_de_prestation,
              prestation: prestation,
            });
          }
        });
        const localGroupedAppointments = Object.values(groupedAppointments);
        setGroupedAppointments(localGroupedAppointments);
        const filteredAppointments = localGroupedAppointments.filter(
          (appointment) => {
            switch (filter) {
              case "confirmed":
                return appointment.is_confirmed;
              case "notConfirmed":
                return !appointment.is_confirmed;
              case "all":
              default:
                return true;
            }
          }
        );
        setAppointments(filteredAppointments);
      } else {
        console.log("Aucun rendez-vous programmé");
      }
    };
    fetchData();
  }, [filter]);

  const handleConfirm = async (appointmentId) => {
    const appointment = groupedAppointments.find(
      (appointment) => appointment.appointment_id === appointmentId
    );
    console.log(appointment);

    if (!appointment) {
      console.error("Rendez-vous non trouvé");
      return;
    }

    try {
      const response = await confirmAppointment(appointmentId, appointment);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = (appointmentId) => {
    // Traiter l'annulation
  };

  const handleModify = (appointmentId) => {
    // Traiter la modification
  };

  return (
    <div className={styles.container}>
      <h2>Liste des rendez-vous</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Tous les rendez-vous</option>
        <option value="confirmed">Rendez-vous confirmés</option>
        <option value="notConfirmed">Rendez-vous non confirmés</option>
      </select>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Prestation</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.lastname}</td>
                <td>{appointment.firstname}</td>
                <td>
                  <ul>
                    {appointment.prestations.map((item, index) => (
                      <li key={index}>
                        {item.type} : {item.prestation}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>
                  {appointment.start_time.split(":").splice(0, 2).join(":")}
                </td>
                <td>
                  <button
                    onClick={() => handleConfirm(appointment.appointment_id)}
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.appointment_id)}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleModify(appointment.appointment_id)}
                  >
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          {`Pas de rendez-vous ${
            filter === "all"
              ? ""
              : filter === "confirmed"
              ? "confirmés"
              : "non confirmés"
          }.`}
        </p>
      )}
    </div>
  );
}

export default AppointmentList;
