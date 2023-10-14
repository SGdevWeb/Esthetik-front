import React, { createContext, useContext, useState } from "react";

const LinksVisibilityContext = createContext();

export const LinksVisibilityProvider = ({ children }) => {
  const [isLinksVisible, setIsLinksVisible] = useState(true);

  const value = {
    isLinksVisible,
    setIsLinksVisible,
  };

  return (
    <LinksVisibilityContext.Provider value={value}>
      {children}
    </LinksVisibilityContext.Provider>
  );
};

export const useLinksVisibility = () => {
  return useContext(LinksVisibilityContext);
};
