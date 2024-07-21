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

export const trackClick = (category, action, name = null, value = null) => {
  if (window._paq) {
    window._paq.push(["trackEvent", category, action, name, value]);
  }
};

export const trackPageView = (url) => {
  if (window._paq) {
    window._paq.push(["setCustomUrl", url]);
    window._paq.push(["setDocumentTitle", document.title]);
    window._paq.push(["trackPageView"]);
  }
};
