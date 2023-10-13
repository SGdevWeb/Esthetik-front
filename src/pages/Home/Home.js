import React from "react";
import styles from "./Home.module.scss";
import Location from "./components/Location";
import Presentation from "./components/Presentation";
import Banner from "../../components/Banner/Banner";
import img from "../../assets/images/prestation/regard.jpg";
import Links from "../../components/Links/Links";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Banner text="Esthéticienne à Valenciennes" backgroundImage={img} />
      </div>
      <Presentation />
      <Location />
      <Links />
    </div>
  );
}

export default Home;
