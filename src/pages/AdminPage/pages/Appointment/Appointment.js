import React, { useEffect } from "react";
import AppointmentList from "../../../../components/Admin/AppointmentList/AppointmentList";
import { usePageTitle } from "../../../../contexts/PageTitleContext";

function Appointment() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Rendez-vous");
  }, [setPageTitle]);

  return (
    <div>
      <AppointmentList />
    </div>
  );
}

export default Appointment;
