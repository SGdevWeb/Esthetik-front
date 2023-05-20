import React, { useEffect, useState } from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import data from "../../../data/tarif.json";
import { useParams } from "react-router-dom";

function Prestation() {
  console.log("rendu");
  const [showImage, setShowImage] = useState(false);
  console.log(showImage);
  const serviceName = useParams().service.split("_").join(" ");
  const dataService = data.find((service) => service.service === serviceName);

  useEffect(() => {
    setShowImage(false);
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [serviceName]);

  return (
    <div className={styles.container}>
      {dataService.prestations.map((prestation, index) => (
        <PrestationCard
          key={index}
          title={prestation.title}
          price={prestation.price}
        />
      ))}
      <div
        className={`${styles.imagePlaceholder} ${
          showImage ? styles.hidden : ""
        }`}
      ></div>
      {showImage && (
        <img
          key={dataService.id}
          src={require(`../../../assets/images/prestation/${dataService.picture}.jpg`)}
          alt={dataService.picture}
          className={`${styles.image}`}
        />
      )}
    </div>
  );
}

export default Prestation;
