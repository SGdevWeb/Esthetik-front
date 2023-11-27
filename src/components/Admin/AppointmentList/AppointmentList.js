import { confirmAppointment } from "../../../api/appointment";
import Button from "../../Button/Button";
import styles from "./AppointmentList.module.scss";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function AppointmentList({ appointments }) {
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const groupAppointments = () => {
      const grouped = {};

      console.log("appointments in AppointmentList", appointments);

      appointments.forEach((appointment) => {
        const { appointment_id, prestation, type_de_prestation, ...rest } =
          appointment;

        if (!grouped[appointment_id]) {
          grouped[appointment_id] = {
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
          grouped[appointment_id].prestations.push({
            type: type_de_prestation,
            prestation: prestation,
          });
        }
      });

      return grouped;
    };

    const applyFilter = (grouped) => {
      return Object.values(grouped).filter((appointment) => {
        switch (filter) {
          case "confirmed":
            return appointment.is_confirmed;
          case "notConfirmed":
            return !appointment.is_confirmed;
          case "all":
          default:
            return true;
        }
      });
    };

    const grouped = groupAppointments();
    const filtered = applyFilter(grouped);

    setGroupedAppointments(grouped);
    setFilteredAppointments(filtered);
  }, [appointments, filter]);

  const handleConfirm = async (appointmentId) => {
    console.log(groupedAppointments);
    const appointmentToConfirm = filteredAppointments.find(
      (appointment) => appointment.appointment_id === appointmentId
    );
    console.log(appointmentToConfirm);

    if (!appointmentToConfirm) {
      console.error("Rendez-vous non trouvé");
      return;
    }

    try {
      const response = await confirmAppointment(
        appointmentId,
        appointmentToConfirm
      );
      console.log(response);
      if (response.status === 200) {
        console.log(groupedAppointments);
        const updatedGroupedAppointments = filteredAppointments.map(
          (appointment) =>
            appointment.appointment_id === appointmentId
              ? { ...appointment, is_confirmed: true }
              : appointment
        );

        setGroupedAppointments(updatedGroupedAppointments);

        const updatedAppointments = updatedGroupedAppointments.filter(
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

        setFilteredAppointments(updatedAppointments);

        toast.success(
          "Rendez-vous confirmé : un mail de confirmation a été envoyé à la cliente"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Liste des rendez-vous</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Tous les rendez-vous</option>
        <option value="confirmed">Rendez-vous confirmés</option>
        <option value="notConfirmed">Rendez-vous non confirmés</option>
      </select>
      {filteredAppointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Prestation(s)</th>
              <th>Date</th>
              <th>Créneau</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments &&
              filteredAppointments.map((appointment) => (
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
                    {appointment.start_time.split(":").splice(0, 2).join(":")} -{" "}
                    {appointment.end_time.split(":").splice(0, 2).join(":")}
                  </td>
                  <td>
                    {!appointment.is_confirmed ? (
                      <Button
                        color="var(--primary-color)"
                        onClick={() =>
                          handleConfirm(appointment.appointment_id)
                        }
                      >
                        Confirmer
                      </Button>
                    ) : (
                      <p>Rendez-vous confimé</p>
                    )}
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
