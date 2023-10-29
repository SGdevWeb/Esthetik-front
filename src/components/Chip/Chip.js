import styles from "./Chip.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Chip({ label, onDelete }) {
  return (
    <div className={styles.container}>
      {label}
      <span className={styles.closeIcon} onClick={onDelete}>
        <FontAwesomeIcon icon={faXmark} />
      </span>
    </div>
  );
}

export default Chip;
