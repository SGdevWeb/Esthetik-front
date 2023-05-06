import React from "react";
import styles from "./TarifPage.module.scss";
import TarifCard from "../../components/Tarifs/TarifCard/TarifCard";
import TarifData from "../../data/tarif.json";
import logo from "../../assets/images/Eclat de beauté.png";
import PromotionsCard from "../../components/Tarifs/PromotionsCard/PromotionsCard";

function TarifPage() {
  console.log(TarifData);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <TarifCard data={TarifData[0]} />
        <TarifCard data={TarifData[1]} />
      </div>
      <div className={styles.middle}>
        <PromotionsCard data={TarifData[2]} />
        <img src={logo} alt="" />
        <TarifCard data={TarifData[3]} />
      </div>
      <div className={styles.right}>
        <TarifCard data={TarifData[4]} />
        <TarifCard data={TarifData[5]} />
        <TarifCard data={TarifData[6]} />
      </div>
    </div>
  );
}

export default TarifPage;
