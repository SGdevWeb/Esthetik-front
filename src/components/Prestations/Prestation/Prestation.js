import React from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import data from "../../../data/tarif.json";
import { useParams } from "react-router-dom";

function Prestation() {
  const serviceName = useParams().service.split("_").join(" ");
  const dataService = data.find((service) => service.service === serviceName);

  return (
    <div className={styles.container}>
      {dataService.prestations.map((prestation, index) => (
        <PrestationCard
          key={index}
          title={prestation.title}
          price={prestation.price}
        />
      ))}
      <img
        key={dataService.id}
        src={require(`../../../assets/images/prestation/${dataService.picture}.jpg`)}
        alt={dataService.picture}
        loading="lazy"
      />
    </div>
  );
}

export default Prestation;
