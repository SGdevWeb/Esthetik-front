import React, { useEffect } from "react";
import { usePageTitle } from "../../../../contexts/PageTitleContext";

function Articles() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Articles");
  }, [setPageTitle]);
  return <div>Articles</div>;
}

export default Articles;
