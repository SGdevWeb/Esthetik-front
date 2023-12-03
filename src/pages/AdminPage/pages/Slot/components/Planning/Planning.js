import React, { useEffect, useState } from "react";
import styles from "./Planning.module.scss";
import { Calendar } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";
import Modal from "../../../../../../components/Modal/Modal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  faPencil,
  faUndo,
  faSave,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../../../components/Button/Button";
import { deleteSlot } from "../../../../../../api/slot";
import { updateSlot } from "../../../../../../api/slot";
import { toast } from "react-toastify";
import {
  addAppointmentServices,
  deleteAppointmentServices,
} from "../../../../../../api/appointment";

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const transformSlotsToEvents = (slots) => {
  return slots.map((slot) => {
    const startDate = new Date(slot.date + "T" + slot.start_time);
    const endDate = new Date(slot.date + "T" + slot.end_time);

    return {
      ...slot,
      start: startDate,
      end: endDate,
      title: slot.is_booked
        ? slot.is_confirmed
          ? "Réservé"
          : "A confirmer"
        : "Disponible",
    };
  });
};

const groupServicesBySlot = (data) => {
  const slots = {};

  data.forEach((item) => {
    if (!slots[item.id]) {
      slots[item.id] = {
        ...item,
        services: [],
      };
    }
    if (item.title) {
      slots[item.id].services.push({
        id: item.service_id,
        title: item.title,
        price: item.price,
        type_de_prestation: item.type_de_prestation,
      });
    }
  });

  return Object.values(slots);
};

const eventStyleGetter = (event, start, end, isSelected) => {
  let style = {
    backgroundColor: event.is_booked
      ? event.is_confirmed
        ? "var(--secondary-color)"
        : "var(--gray-2)"
      : "var(--primary-color)",
    borderRadius: "5px",
    opacity: 0.8,
    color: "white",
    border: "0px",
    display: "block",
  };

  return {
    style: style,
  };
};

const groupServicesByRate = (services) => {
  return services.reduce((groups, service) => {
    if (!groups[service.rate_name]) {
      groups[service.rate_name] = [];
    }
    groups[service.rate_name].push(service);
    return groups;
  }, {});
};

const Planning = ({ slots, allServices, onSlotsUpdated }) => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formattedSlots, setFormattedSlots] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServiceToAdd, setSelectedServiceToAdd] = useState("");

  const groupedServices = groupServicesByRate(allServices);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 9; hour < 18; hour++) {
      // Heures s'arrêtant avant 18h
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        times.push(time);
      }
    }
    // Ajout de 18:00 séparément
    times.push("18:00");
    return times;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    const groupedData = groupServicesBySlot(slots);
    const newFormattedSlots = transformSlotsToEvents(groupedData);
    setFormattedSlots(newFormattedSlots);
  }, [slots]);

  useEffect(() => {
    if (selectedEvent) {
      setStartTime(format(new Date(selectedEvent.start), "HH:mm"));
      setEndTime(format(new Date(selectedEvent.end), "HH:mm"));
    }
    if (selectedEvent && selectedEvent.services) {
      setSelectedServices(selectedEvent.services);
    }
  }, [selectedEvent]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    if (selectedEvent && selectedEvent.id) {
      const updatedStartTime = new Date(selectedEvent.date + "T" + startTime);
      const updatedEndTime = new Date(selectedEvent.date + "T" + endTime);

      const isOverlapping = formattedSlots.some((slot) => {
        if (slot.id === selectedEvent.id || slot.date !== selectedEvent.date) {
          return false;
        }
        return (
          (updatedStartTime < slot.end && updatedStartTime > slot.start) ||
          (updatedEndTime > slot.start && updatedEndTime < slot.end)
        );
      });

      if (isOverlapping) {
        console.error(
          "Le créneau chevauche un autre créneau existant sur la même date."
        );
        toast.error(
          "Le créneau chevauche un autre créneau existant sur la même date."
        );
        setIsEditing(false);
        return;
      }

      try {
        const updatedSlotData = {
          start_time: startTime,
          end_time: endTime,
        };

        const slotResponse = await updateSlot(
          selectedEvent.id,
          updatedSlotData
        );

        if (slotResponse && slotResponse.status === 200) {
          console.log("Créneau mis à jour avec succès");

          await deleteAppointmentServices(selectedEvent.appointment_id);

          const newServiceIds = selectedServices.map((service) => service.id);

          await addAppointmentServices(
            selectedEvent.appointment_id,
            newServiceIds
          );

          console.log("prestations mises à jour avec succès");

          const slotIndex = formattedSlots.findIndex(
            (slot) => slot.id === selectedEvent.id
          );

          const updatedEvent = {
            ...selectedEvent,
            start: updatedStartTime,
            end: updatedEndTime,
            start_time: startTime,
            end_time: endTime,
            services: [...selectedServices],
          };

          const newFormattedSlots = [...formattedSlots];
          newFormattedSlots[slotIndex] = updatedEvent;

          setFormattedSlots(newFormattedSlots);
          setSelectedEvent(updatedEvent);
          onSlotsUpdated();
        } else {
          toast.error("Erreur lors de la mise à jour du rendez-vous");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour : ", error);
      }
    }
    handleCloseModal();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEvent && selectedEvent.id) {
      const response = await deleteSlot(selectedEvent.id);
      if (response && response.status === 200) {
        console.log("Créneau et rdv supprimés avec succès");
        const slotsAfterDelete = formattedSlots.filter(
          (event) => event.id !== selectedEvent.id
        );
        setFormattedSlots(slotsAfterDelete);
        setIsModalOpen(false);
      }
    }
    handleCloseModal();
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowDeleteConfirmation(false);
    setIsEditing(false);
  };

  const handleAddService = () => {
    const serviceToAdd = allServices.find(
      (service) => service.service_id.toString() === selectedServiceToAdd
    );

    if (serviceToAdd) {
      setSelectedServices([
        ...selectedServices,
        {
          id: serviceToAdd.service_id,
          title: serviceToAdd.service_title,
          price: serviceToAdd.service_price,
          type_de_prestation: serviceToAdd.rate_name,
        },
      ]);
      setSelectedServiceToAdd("");
    }
  };

  const handleRemoveService = (serviceId) => {
    setSelectedServices(
      selectedServices.filter((service) => service.id !== serviceId)
    );
  };

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={formattedSlots}
        startAccessor="start"
        endAccessor="end"
        culture="fr"
        style={{ height: "100%" }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
      />
      {selectedEvent && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {" "}
          <div className={styles.modalContent}>
            {selectedEvent.is_booked ? (
              <>
                <h3>Détails du rendez-vous</h3>
                <p>
                  <span>Client :</span> {selectedEvent.firstname}{" "}
                  {selectedEvent.lastname}
                </p>
                <p>
                  <span>Email :</span> {selectedEvent.email}
                </p>
                <p>
                  <span>Créneau :</span>{" "}
                  {selectedEvent.start_time.split(":").slice(0, 2).join("h")} -{" "}
                  {selectedEvent.end_time.split(":").slice(0, 2).join("h")}
                </p>
                <h4>Prestations réservées</h4>
                <ul>
                  {selectedEvent.services &&
                    selectedEvent.services.map((service, index) => (
                      <li key={index}>
                        - {service.type_de_prestation} : {service.title}
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <>
                <p>Actuellement, ce créneau n'a pas encore été reservé</p>
                <p>
                  <span>Créneau :</span>{" "}
                  {selectedEvent.start_time.split(":").slice(0, 2).join("h")} -{" "}
                  {selectedEvent.end_time.split(":").slice(0, 2).join("h")}
                </p>
              </>
            )}
            {showDeleteConfirmation ? (
              // Section de confirmation de suppression
              <div className={styles.deleteSection}>
                <h3>Suppression d'un créneau</h3>
                <p>
                  Êtes-vous sûr de vouloir supprimer définitivement ce créneau ?
                </p>
                <div className={styles.row}>
                  <Button
                    color="var(--secondary-color)"
                    onClick={handleConfirmDelete}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Confirmer</span>
                  </Button>
                  <Button
                    color="var(--secondary-color)"
                    onClick={handleCancelDelete}
                  >
                    <FontAwesomeIcon icon={faUndo} />
                    <span>Annuler</span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {isEditing ? (
                  // Section de modification
                  <div className={styles.modifySection}>
                    <div className={styles.slotSection}>
                      <h3>Modification du créneau</h3>
                      <div className={styles.row}>
                        <div className={styles.inputContainer}>
                          <label>Heure de début</label>
                          <select
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                          >
                            {timeOptions.map(
                              (time, index) =>
                                index < timeOptions.length - 1 && (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                )
                            )}
                          </select>
                        </div>
                        <div className={styles.inputContainer}>
                          <label>Heure de fin</label>
                          <select
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          >
                            {timeOptions.map(
                              (time, index) =>
                                index > 0 && (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className={styles.serviceSection}>
                      <h3>Modification des prestations</h3>
                      <div className={styles.inputSection}>
                        <h4>Prestation(s) actuelle(s)</h4>
                        <ul>
                          {selectedServices.length > 0 ? (
                            selectedServices.map((service, index) => (
                              <li
                                key={index}
                                className="d-flex align-items-center"
                                style={{ justifyContent: "space-between" }}
                              >
                                - {service.type_de_prestation} : {service.title}
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  style={{
                                    cursor: "pointer",
                                    color: "var(--primary-color)",
                                  }}
                                  onClick={() =>
                                    handleRemoveService(service.id)
                                  }
                                />
                              </li>
                            ))
                          ) : (
                            <p>Aucune prestation</p>
                          )}
                        </ul>
                      </div>
                      <div className={styles.inputSection}>
                        <h4>Ajouter des prestations</h4>
                        <div className={styles.row}>
                          <select
                            value={selectedServiceToAdd}
                            onChange={(e) =>
                              setSelectedServiceToAdd(e.target.value)
                            }
                          >
                            <option value="">Ajouter une prestation</option>
                            {Object.keys(groupedServices).map((rateName) => (
                              <optgroup label={rateName} key={rateName}>
                                {groupedServices[rateName].map((service) => (
                                  <option
                                    key={service.service_id}
                                    value={service.service_id}
                                  >
                                    {service.service_title}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          <div className="d-flex align-items-center justify-content-center ml-15">
                            <FontAwesomeIcon
                              icon={faPlus}
                              style={{
                                cursor: "pointer",
                                color: "var(--primary-color)",
                              }}
                              onClick={handleAddService}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.row}>
                      <Button
                        color="var(--secondary-color)"
                        onClick={handleSaveChanges}
                      >
                        <FontAwesomeIcon icon={faSave} />
                        <span>Enregistrer</span>
                      </Button>
                      <Button
                        color="var(--secondary-color)"
                        onClick={handleCancelEdit}
                      >
                        <FontAwesomeIcon icon={faUndo} />
                        <span>Annuler</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Boutons Modifier et Supprimer
                  <div className={styles.buttons}>
                    <Button
                      color="var(--secondary-color)"
                      onClick={handleEditClick}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                      <span>Modifier</span>
                    </Button>
                    <Button
                      color="var(--secondary-color)"
                      onClick={handleDeleteClick}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                      <span>Supprimer</span>
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Planning;
