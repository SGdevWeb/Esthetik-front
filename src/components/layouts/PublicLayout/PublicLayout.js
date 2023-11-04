import React, { useEffect, useRef } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import styles from "./PublicLayout.module.scss";
import { useLinksVisibility } from "../../../contexts/LinksVisibilityContext";

const PublicLayout = ({ children }) => {
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
    <>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer ref={footerRef} />
    </>
  );
};

export default PublicLayout;
