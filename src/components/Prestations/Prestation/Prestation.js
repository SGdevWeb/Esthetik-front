import React, { useEffect, useState } from "react";
import styles from "./Prestation.module.scss";
import PrestationCard from "../PrestationCard/PrestationCard";
import { Link, useParams } from "react-router-dom";
import { fetchRateById, fetchRateIdByName } from "../../../api/rates";
import { fetchServicesByRateId } from "../../../api/services";
import { fetchPackage } from "../../../api/packages";
import Banner from "../../Banner/Banner";
import Button from "../../Button/Button";
import prestationImages from "../../../utils/prestationImages";

function Prestation() {
  const { rate } = useParams();
  const rateName = rate.split("_").join(" ");
  const [rateData, setRateData] = useState({});
  const [services, setServices] = useState([]);
  const [packageData, setPackageData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const getRate = async () => {
      try {
        const rateId = await getRateIdByName(rateName);
        if (rateId) {
          getRateById(rateId);
          getServicesByRateId(rateId);
          getPackage(rateId);
          if (rateData.img_name && prestationImages[rateData.img_name]) {
            setBackgroundImage(prestationImages[rateData.img_name]);
          }
        } else {
          console.error("Aucun tarif trouvé pour ce nom");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    const getRateIdByName = async (rateName) => {
      const response = await fetchRateIdByName(rateName);
      return response.data;
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
  }, [rateName, rateData.img_name]);

  return (
    <div className={styles.container}>
      <Banner backgroundImage={backgroundImage} />
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
          <Link to={`/prestations/forfait?ancre=${rateData.name}`}>
            <Button color="var(--secondary-color)">
              Forfait <span>{rateData.name}</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Prestation;
