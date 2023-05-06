import React from "react";
import styles from "./home.module.scss";
import Location from "../../components/Location/Location";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <Location />
    </div>
  );
}

export default Home;
