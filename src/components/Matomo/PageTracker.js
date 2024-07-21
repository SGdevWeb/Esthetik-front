import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMatomo } from "react-matomo";

const PageTracker = () => {
  const { trackPageView } = useMatomo();
  const location = useLocation();

  useEffect(() => {
    // Log les informations de la page pour débogage
    console.log("Tracking Page View:");
    console.log("Title:", document.title);
    console.log("Path:", location.pathname);
    console.log("Search Params:", location.search);

    // Suivre la vue de la page avec Matomo
    trackPageView({
      documentTitle: document.title,
      href: location.pathname + location.search,
    });
  }, [location, trackPageView]);

  return null;
};

export default PageTracker;
