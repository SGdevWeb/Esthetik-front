import React, { useEffect } from "react";
import styles from "./AdminPage.module.scss";
import { usePageTitle } from "../../contexts/PageTitleContext";
import VisitsChart from "../../components/Matomo/VisitsChart/VisitsChart";
import TopPagesChart from "../../components/Matomo/TopPagesChart/topPagesChart";
import AverageTimeChart from "../../components/Matomo/AverageTimeChart/AverageTimeChart";
import BounceRateChart from "../../components/Matomo/BounceRateChart/BounceRateChart";

function AdminHome() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("Tableau de bord");
  }, [setPageTitle]);

  return (
    <div className={styles.container}>
      <VisitsChart />
      <TopPagesChart />
      <AverageTimeChart />
      <BounceRateChart />
    </div>
  );
}

export default AdminHome;
