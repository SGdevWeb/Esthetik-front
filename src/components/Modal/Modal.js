import styles from "./Modal.module.scss";
// import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal({ isOpen, onClose, children }) {
  return (
    <div className={`${styles.container} ${isOpen && styles.open}`}>
      <div className={styles.modalContent}>
        {/* <CloseIcon className={styles.close} onClick={onClose} /> */}
        <FontAwesomeIcon
          icon={faXmark}
          onClick={onClose}
          className={styles.close}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
