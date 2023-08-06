import React, { useEffect, useState } from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import { useParams } from "react-router-dom";
import axios from "axios";

function Prestation() {
  const { rate } = useParams();
  const rateName = rate.split("_").join(" ");
  const [rateData, setRateData] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchRateId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/rates/name/${rateName}`
        );
        const rateId = response.data[0].id;
        fetchRateById(rateId);
        fetchServicesByRateId(rateId);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de tarifs");
      }
    };

    const fetchRateById = async (rateId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/rates/id/${rateId}`
        );
        setRateData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de tarifs");
      }
    };

    const fetchServicesByRateId = async (rateId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/services/${rateId}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données de services");
      }
    };

    fetchRateId();
  }, [rateName]);

  return (
    <div className={styles.container}>
      {services.length > 0 &&
        services.map((service, index) => (
          <PrestationCard
            key={index}
            title={service.title}
            price={service.price}
          />
        ))}
      <div className={styles.imageContainer}>
        {rateData.length > 0 && (
          <img
            key={rateData[0].id}
            src={require(`../../../assets/images/prestation/${rateData[0].picture}.jpg`)}
            alt={rateData[0].picture}
            className={`${styles.image}`}
          />
        )}
      </div>
    </div>
  );
}

export default Prestation;
