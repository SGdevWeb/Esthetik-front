import React, { useEffect } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";

function Services() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Prestations");
  }, [setPageTitle]);

  return <div>Services</div>;
}

export default Services;
