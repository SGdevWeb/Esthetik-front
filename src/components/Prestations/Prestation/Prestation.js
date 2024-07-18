import React, { useEffect, useState } from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import { Link, useParams } from "react-router-dom";
import { fetchRateById, fetchRateIdByName } from "../../../api/rates";
import { fetchServicesByRateId } from "../../../api/services";
import { fetchPackage } from "../../../api/packages";
import Banner from "../../Banner/Banner";
import Button from "../../Button/Button";

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
      const response = await fetchServicesByRateId(rateId);
      setServices(response.data);
    };

    const getPackage = async (rateId) => {
      const packageData = await fetchPackage(rateId);
      setPackageData(packageData);
    };

    getRate();
  }, [rateName]);

  const backgroundImageUrl =
    rateData.length > 0
      ? require(`../../../assets/images/prestation/${rateData[0].img_name}.jpg`)
      : undefined;

  return (
    <div className={styles.container}>
      <Banner backgroundImage={backgroundImageUrl} />
      <div className={styles.services}>
        {services.length > 0 &&
          services.map((service, index) => (
            <PrestationCard
              key={index}
              index={index}
              title={service.title}
              price={service.price}
            />
          ))}
      </div>
      {packageData.length > 0 && (
        <div className={styles.package}>
          <Link to={`/prestations/forfait?ancre=${rateData[0].name}`}>
            <Button color="var(--secondary-color)">
              Forfait <span>{rateData[0].name}</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Prestation;
