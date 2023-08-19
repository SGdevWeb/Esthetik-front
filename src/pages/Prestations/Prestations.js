import React from "react";
import styles from "./Prestations.module.scss";
import Navigation from "../../components/Prestations/Navigation/Navigation";
import Promotion from "../../components/Prestations/Promotion/Promotion";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

function Prestations() {
  const params = useParams();
  const url = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.contentMobile}>
        <p>
          Découvrez les différentes prestations esthétiques pour prendre soin de
          vous et sublimer votre beauté.
        </p>
      </div>
      <nav className={styles.navigation}>
        <Navigation />
      </nav>
      <div>
        <Outlet />
      </div>
      {params.rate === undefined && url.pathname !== "/prestations/forfait" && (
        <div>
          <div className={styles.content}>
            <p>
              Découvrez les différentes prestations esthétiques pour prendre
              soin de vous et sublimer votre beauté.
            </p>
            <p>
              Que vous ayez besoin d'une{" "}
              <Link to="/prestations/Epilations">épilation</Link>{" "}
              professionnelle, d'un{" "}
              <Link to="/prestations/Maquillage">maquillage</Link> pour une
              occasion spéciale, d'un{" "}
              <Link to="/prestations/Soins_visage">soin du visage</Link> adapté
              à votre type de peau ou d'une{" "}
              <Link to="/prestations/Beauté_des_Mains">manucure</Link>{" "}
              impeccable, je suis prête à répondre à tous vos besoins.
            </p>
          </div>
          <Promotion />
        </div>
      )}
    </div>
  );
}

export default Prestations;
