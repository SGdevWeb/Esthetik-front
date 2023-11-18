import React, { useEffect, useState } from "react";
import styles from "./Slot.module.scss";
import Planning from "./components/Planning/Planning";
import Button from "../../../../components/Button/Button";
import Modal from "../../../../components/Modal/Modal";
import RepetitiveSlots from "./components/RepetitiveSlots/RepetitiveSlots";
import { fetchSlotsDetails } from "../../../../api/slot";

function Slot() {
  const [slots, setSlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    loadSlots();
  }, []);

  function addSlot() {
    setIsModalOpen(true);
  }

  function handleSlotsAdded() {
    loadSlots();
  }

  return (
    <div className={styles.container}>
      <h1>Planning</h1>
      <Planning slots={slots} />
      <div className={styles.btnContainer}>
        <Button color="var(--primary-color)" onClick={addSlot}>
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
    </div>
  );
}

export default Slot;
