// src/components/PageTracker.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMatomo } from "react-matomo";

const PageTracker = () => {
  const { trackPageView } = useMatomo();
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location, trackPageView]);

  return null;
};

export default PageTracker;
