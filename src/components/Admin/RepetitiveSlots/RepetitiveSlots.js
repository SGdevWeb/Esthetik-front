import { useState } from "react";
import { addSlots, axiosConfig } from "../../../api/slot";
import { useAuth } from "../../../contexts/AuthContext";

function RepetitiveSlots() {
  const { token } = useAuth();

  const [selectedDay, setSelectedDay] = useState("");
  const [repeatCount, setRepeatCount] = useState(1);
  const [startTime, setStartTime] = useState("09:00"); // format 24h, début par défaut à 9h
  const [endTime, setEndTime] = useState("10:00"); // format 24h, fin par défaut à 10h
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const times = [];
  for (let i = 9; i <= 18; i++) {
    // supposons que les horaires vont de 9h à 18h
    times.push(i < 10 ? `0${i}:00` : `${i}:00`);
  }

  const generateSlots = () => {
    let slots = [];

    // Convert selectedDay string to a Date object
    let currentDay = new Date(selectedDay + "T00:00:00Z"); // assume selectedDay is in UTC

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
          date: currentDay.toISOString().split("T")[0], // Store the date part in UTC
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

      // Increment day by 7 for the next week
      currentDay.setUTCDate(currentDay.getUTCDate() + 7);
    }

    return slots;
  };

  const handleSubmit = async () => {
    if (startTime > endTime) {
      alert("L'heure de fin doit être après l'heure de début");
    } else {
      const slots = generateSlots();
      console.log("Slots générés pour la soumission : ", slots);
      try {
        const response = await addSlots(slots, axiosConfig(token));
        console.log("response", response);
        if (response.status === 201) {
          console.log("Créneaux soumis : ", slots);
          setSelectedDay("");
          setRepeatCount(1);
          setStartTime("09:00");
          setEndTime("10:00");
          setErrorMessage("");
          const { message } = response.data;
          setSuccessMessage(message);
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
    <div>
      <div>
        <label>
          Sélectionnez le jour:
          <input
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Heure de début:
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
        </label>
        <label>
          Heure de fin:
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
        </label>
      </div>
      <div>
        <label>
          Répéter pendant combien de semaines?
          <input
            type="number"
            value={repeatCount}
            onChange={(e) => setRepeatCount(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Appliquer</button>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default RepetitiveSlots;
