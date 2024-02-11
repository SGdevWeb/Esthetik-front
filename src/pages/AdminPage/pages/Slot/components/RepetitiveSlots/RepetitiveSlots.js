import { useState } from "react";
import styles from "./RepetitiveSlots.module.scss";
import { addSlots } from "../../../../../../api/slot";
import InputCustom from "../../../../../../components/InputCustom/InputCustom";
import Button from "../../../../../../components/Button/Button";

function RepetitiveSlots({ onSlotsAdded }) {
  const [selectedDay, setSelectedDay] = useState("");
  const [repeatCount, setRepeatCount] = useState(1);
  const [startTime, setStartTime] = useState("09:00"); // format 24h, début par défaut à 9h
  const [endTime, setEndTime] = useState("10:00"); // format 24h, fin par défaut à 10h
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const times = [];
  for (let i = 9; i <= 21; i++) {
    // Horaires vont de 9h à 18h
    times.push(i < 10 ? `0${i}:00` : `${i}:00`);
  }

  const generateSlots = () => {
    let slots = [];

    // Conversion en objet Date
    let currentDay = new Date(selectedDay + "T00:00:00Z");
    // Parse start and end times
    const [startHour, startMinute] = startTime
      .split(":")
      .map((part) => parseInt(part, 10));
    const [endHour, endMinute] = endTime
      .split(":")
      .map((part) => parseInt(part, 10));

    for (let week = 0; week < repeatCount; week++) {
      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute < endMinute)
      ) {
        let nextHour = currentHour;
        let nextMinute = currentMinute + 60;
        if (nextMinute >= 60) {
          nextMinute = 0;
          nextHour += 1;
        }

        slots.push({
          date: currentDay.toISOString().split("T")[0],
          startTime: `${String(currentHour).padStart(2, "0")}:${String(
            currentMinute
          ).padStart(2, "0")}`,
          endTime: `${String(nextHour).padStart(2, "0")}:${String(
            nextMinute
          ).padStart(2, "0")}`,
        });

        currentHour = nextHour;
        currentMinute = nextMinute;
      }

      currentDay.setUTCDate(currentDay.getUTCDate() + 7);
    }

    return slots;
  };

  const handleSubmit = async () => {
    if (startTime > endTime) {
      alert("L'heure de fin doit être après l'heure de début");
    } else {
      const newSlots = generateSlots();
      try {
        const response = await addSlots(newSlots);
        if (response.status === 201) {
          setSelectedDay("");
          setRepeatCount(1);
          setStartTime("09:00");
          setEndTime("10:00");
          setErrorMessage("");
          const { message } = response.data;
          setSuccessMessage(message);
          onSlotsAdded(newSlots);
        } else {
          console.log("response", response);
          const { message } = response.data;
          setErrorMessage("Erreur lors de l'ajout des créneaux : " + message);
        }
      } catch (error) {
        setErrorMessage(
          "Erreur lors de l'ajout des créneaux : " + error.message
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.inputContainer}>
          <label>Sélectionnez le jour</label>
          <InputCustom
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            style={{ marginTop: "5px" }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label>Heure de début</label>
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            {times.map(
              (time, index) =>
                index < times.length - 1 && (
                  <option key={time} value={time}>
                    {time}
                  </option>
                )
            )}
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label>Heure de fin</label>
          <select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
            {times.map(
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

      <div className={styles.inputContainer}>
        <label>Récurrence : durant combien de semaines ?</label>
        <InputCustom
          type="number"
          value={repeatCount}
          onChange={(e) => setRepeatCount(e.target.value)}
          style={{ marginTop: "5px" }}
        />
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={handleSubmit} color="var(--primary-color)">
          Appliquer
        </Button>
      </div>
      <div className={styles.message}>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
}

export default RepetitiveSlots;
