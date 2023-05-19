import React from "react";
import styles from "./Prestations.module.scss";
import Navigation from "../../components/Prestations/Navigation/Navigation";
import Promotion from "../../components/Prestations/Promotion/Promotion";
import { Outlet, useParams } from "react-router-dom";

function Prestations() {
  const params = useParams();

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <Navigation />
      </nav>
      <div>
        <Outlet />
      </div>
      {params.service === undefined && (
        <div>
          <div className={styles.content}>
            <p>
              Découvrez les différentes prestations esthétiques pour prendre
              soin de vous et sublimer votre beauté.
            </p>
            <p>
              Que vous ayez besoin d'une épilation professionnelle, d'un
              maquillage pour une occasion spéciale, d'un soin du visage adapté
              à votre type de peau ou d'une manucure impeccable, je suis prête à
              répondre à tous vos besoins.
            </p>
          </div>
          <Promotion />
        </div>
      )}
    </div>
  );
}

export default Prestations;
