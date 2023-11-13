import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";
import { fetchSlots } from "../../../../../../api/slot";

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
      title: slot.is_booked ? "Réservé" : "Dispo",
    };
  });
};

const eventStyleGetter = (event, start, end, isSelected) => {
  let style = {
    backgroundColor: event.is_booked
      ? "var(--secondary-color)"
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

const Planning = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSlots();

      if (response.status !== 200) {
        console.error(
          "Erreur lors de la récupération des créneaux : ",
          response.statusText
        );
        return;
      }

      if (response.data && response.data.length) {
        console.log(response.data);
        const formattedSlots = transformSlotsToEvents(response.data);
        setSlots(formattedSlots);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={slots}
        startAccessor="start"
        endAccessor="end"
        culture="fr"
        style={{ height: "100%" }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Planning;
