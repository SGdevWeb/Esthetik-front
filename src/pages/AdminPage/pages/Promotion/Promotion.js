import React, { useEffect } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";

function Promotion() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Promotions");
  }, [setPageTitle]);

  return <div>Promotion</div>;
}

export default Promotion;
