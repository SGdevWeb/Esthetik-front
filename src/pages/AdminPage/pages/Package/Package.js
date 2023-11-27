import React, { useEffect } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";

function Package() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Forfaits");
  }, [setPageTitle]);
  return <div>Package</div>;
}

export default Package;
