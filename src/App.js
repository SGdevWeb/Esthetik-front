import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import { useLinksVisibility } from "./contexts/LinksVisibilityContext";
import { useEffect, useRef } from "react";

function App() {
  const { setIsLinksVisible } = useLinksVisibility();

  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        if (footerRef.current) {
          const footerTop = footerRef.current.getBoundingClientRect().top;
          const newVisibility = footerTop >= window.innerHeight;
          setIsLinksVisible(newVisibility);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsLinksVisible, footerRef]);

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer ref={footerRef} />
    </div>
  );
}

export default App;
