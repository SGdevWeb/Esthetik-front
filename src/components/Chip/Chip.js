import React from "react";
import styles from "./Chip.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Chip({ label, onDelete }) {
  return (
    <div className={styles.container}>
      {label}
      <span className={styles.closeIcon} onClick={onDelete} role="button">
        <FontAwesomeIcon icon={faXmark} data-testid="close-icon" />
      </span>
    </div>
  );
}

export default Chip;
