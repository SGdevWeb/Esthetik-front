import { createContext, useContext, useState } from "react";

const PageTitleContext = createContext();

export function PageTitleProvider({ children }) {
  const [pageTitle, setPageTitle] = useState("");

  const value = {
    pageTitle,
    setPageTitle,
  };

  return (
    <PageTitleContext.Provider value={value}>
      {children}
    </PageTitleContext.Provider>
  );
}

export const usePageTitle = () => {
  return useContext(PageTitleContext);
};
