import React, { useEffect, useState } from "react";
import styles from "./Slot.module.scss";
import Planning from "./components/Planning/Planning";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import RepetitiveSlots from "./components/RepetitiveSlots/RepetitiveSlots";
import { fetchSlotsDetails } from "../../../../api/slot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { usePageTitle } from "../../../../contexts/PageTitleContext";
import AppointmentList from "../../../../components/Admin/AppointmentList/AppointmentList";
import { fetchServicesWithRates } from "../../../../api/services";
import { fetchAppointmentsDetails } from "../../../../api/appointment";

function Slot() {
  const [slots, setSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Planning");
  }, [setPageTitle]);

  const loadSlots = async () => {
    const response = await fetchSlotsDetails();
    if (response.status !== 200) {
      console.error(
        "Erreur lors de la récupération des créneaux : ",
        response.statusText
      );
      return;
    }

    if (response.data && response.data.length) {
      setSlots(response.data);
    }
  };

  const loadAppointments = async () => {
    const response = await fetchAppointmentsDetails();
    if (response.status !== 200) {
      console.error(
        "Erreur lors de la récupération des rendez-vous : ",
        response.statusText
      );
      return;
    }

    if (response.data && response.data.length) {
      setAppointments(response.data);
    }
  };

  const getServices = async () => {
    const response = await fetchServicesWithRates();
    if (response.status !== 200) {
      console.error(
        "Erreur lors de la récupération des prestations : ",
        response.statusText
      );
      return;
    }

    if (response.data && response.data.length) {
      setServices(response.data);
    }
  };

  useEffect(() => {
    loadSlots();
    getServices();
    loadAppointments();
  }, []);

  function addSlot() {
    setIsModalOpen(true);
  }

  function handleSlotsAdded() {
    loadSlots();
  }

  return (
    <div className={styles.container}>
      <Planning
        slots={slots}
        allServices={services}
        onSlotsUpdated={() => {
          loadSlots();
          loadAppointments();
        }}
      />
      <div className={styles.btnContainer}>
        <Button color="var(--primary-color)" onClick={addSlot}>
          <FontAwesomeIcon icon={faPlus} className="mr-10" />
          Ajouter un créneau
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {" "}
        <div className={styles.modalContent}>
          <h3>Ajouter un ou plusieurs créneaux</h3>
          <RepetitiveSlots onSlotsAdded={handleSlotsAdded} />
        </div>
      </Modal>
      <AppointmentList appointments={appointments} />
    </div>
  );
}

export default Slot;
