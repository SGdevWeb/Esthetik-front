import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import Location from "./components/Location";
import Presentation from "./components/Presentation";
import Banner from "../../components/Banner/Banner";
import img from "../../assets/images/prestation/regard.jpg";
import Links from "../../components/Links/Links";
import { fetchRates } from "../../api/rates";
import Cards from "../../components/Cards/Cards";

function Home() {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const getRates = async () => {
      const response = await fetchRates();
      setRates(response.data);
    };
    getRates();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Banner text="Esthéticienne à Valenciennes" backgroundImage={img} />
      </div>
      <Presentation />
      <Cards title="prestations" data={rates} />
      <Location />
      <Links />
    </div>
  );
}

export default Home;
