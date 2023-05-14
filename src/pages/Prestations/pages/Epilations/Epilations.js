import React from "react";
import styles from "./Epilations.module.scss";
import PrestationCard from "../../../../components/Prestations/PrestationCard/PrestationCard";
import data from "../../../../data/tarif.json";

function Epilations() {
  const dataEpilations = data.find((p) => p.service === "Epilations");
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

export default Epilations;
