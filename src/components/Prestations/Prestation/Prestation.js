import React, { useEffect, useState } from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import { Link, useParams } from "react-router-dom";
import { fetchRateById, fetchRateIdByName } from "../../../api/rates";
import { fetchServicesByRateId } from "../../../api/services";
import { fetchPackage } from "../../../api/packages";

const apiUrl = process.env.REACT_APP_API_URL;

console.log(apiUrl);

function Prestation() {
  const { rate } = useParams();
  const rateName = rate.split("_").join(" ");
  const [rateData, setRateData] = useState([]);
  const [services, setServices] = useState([]);
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const getRate = async () => {
      const rateId = await getRateIdByName(rateName);
      getRateById(rateId);
      getServicesByRateId(rateId);
      getPackage(rateId);
    };

    const getRateIdByName = async (rateName) => {
      const rateId = await fetchRateIdByName(rateName);
      return rateId;
    };

    const getRateById = async (rateId) => {
      const rateData = await fetchRateById(rateId);
      setRateData(rateData);
    };

    const getServicesByRateId = async (rateId) => {
      const servicesData = await fetchServicesByRateId(rateId);
      setServices(servicesData);
    };

    const getPackage = async (rateId) => {
      const packageData = await fetchPackage(rateId);
      setPackageData(packageData);
    };

    getRate();
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
