import styles from "./SlotBookingForm.module.scss";
import React, { useState, useEffect } from "react";
import { fetchSlots } from "../../../api/slot";
import { formatTime } from "../../../utils/formatTime";
import InputCustom from "../../InputCustom/InputCustom";

function SlotBookingForm({
  onDateChange,
  onSlotChange,
  selectedDate,
  selectedSlot,
}) {
  const [slots, setSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSlots();
      if (response.data && response.data.length) {
        const formattedSlots = response.data.map((slot) => ({
          ...slot,
          start_time: formatTime(slot.start_time),
          end_time: formatTime(slot.end_time),
        }));
        setSlots(formattedSlots);
      } else {
        console.error(
          "Erreur lors de la récupération des créneaux : ",
          response
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const slotsForDay = slots.filter((slot) => slot.date === selectedDate);
      setAvailableSlots(slotsForDay);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, slots]);

  const currentDateFormatted = new Date().toISOString().split("T")[0];
  const maxDate = slots.length
    ? new Date(
        Math.max.apply(
          null,
          slots.map((slot) => new Date(slot.date))
        )
      )
    : new Date();
  const maxDateFormatted = maxDate.toISOString().split("T")[0];

  return (
    <div className={styles.container}>
      <InputCustom
        type="date"
        value={selectedDate}
        min={currentDateFormatted}
        max={maxDateFormatted}
        onChange={(e) => {
          onDateChange(e.target.value);
        }}
      />

      {selectedDate &&
        (availableSlots.length ? (
          <select
            value={selectedSlot}
            onChange={(e) => {
              console.log(e.target.value);
              onSlotChange(e.target.value);
            }}
          >
            <option value="">Sélectionner un créneau</option>
            {availableSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.start_time} - {slot.end_time}
              </option>
            ))}
          </select>
        ) : (
          <p>Aucun créneaux disponible ce jour</p>
        ))}
    </div>
  );
}

export default SlotBookingForm;
