import React, { useEffect, useState } from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Prestation() {
  const { rate } = useParams();
  const rateName = rate.split("_").join(" ");
  const [rateData, setRateData] = useState([]);
  const [services, setServices] = useState([]);
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fetchRateByName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/rates/name/${rateName}`
        );
        const rateId = response.data[0].id;
        fetchRateById(rateId);
        fetchServicesByRateId(rateId);
        fetchPackage(rateId);
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

    const fetchPackage = async (rateId) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/packages/rate/${rateId}`
        );
        setPackageData(response.data);
      } catch {
        console.error("Erreur lors de la récupération des données de forfaits");
      }
    };

    fetchRateByName();
  }, [rateName]);

  return (
    <div className={styles.container}>
      <div className={styles.services}>
        {services.length > 0 &&
          services.map((service, index) => (
            <PrestationCard
              key={index}
              title={service.title}
              price={service.price}
            />
          ))}
      </div>
      <div className={styles.package}>
        {packageData.length > 0 && (
          <Link to={`/prestations/forfait?ancre=${rateData[0].name}`}>
            <button>
              Forfait <span>{rateData[0].name}</span>
            </button>
          </Link>
        )}
      </div>
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
