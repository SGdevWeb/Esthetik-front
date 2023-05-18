import React from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import data from "../../../data/tarif.json";
import { useParams } from "react-router-dom";

function Prestation() {
  const serviceName = useParams().service.split("_").join(" ");
  console.log(serviceName);
  const dataEpilations = data.find(
    (service) => service.service === serviceName
  );
  console.log(dataEpilations);
  return (
    <div className={styles.container}>
      {dataEpilations.prestations.map((prestation, index) => (
        <PrestationCard
          key={index}
          title={prestation.title}
          price={prestation.price}
        />
      ))}
    </div>
  );
}

export default Prestation;
