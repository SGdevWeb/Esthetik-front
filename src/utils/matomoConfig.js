import { createInstance } from "react-matomo";

export const initMatomo = () => {
  const instance = createInstance({
    url: "https://éclatdebeauté.fr/matomo/",
    urlBase: "https://éclatdebeauté.fr",
    siteId: 1,
    trackerUrl: "https://éclatdebeauté.fr/matomo/matomo.php",
    srcUrl: "https://éclatdebeauté.fr/matomo/matomo.js",
  });

  return instance;
};
