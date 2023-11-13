import React from "react";
import styles from "./Slot.module.scss";
import Planning from "./components/Planning/Planning";

function Slot() {
  return (
    <div className={styles.container}>
      <h1>Slots</h1>
      <Planning />
    </div>
  );
}

export default Slot;
