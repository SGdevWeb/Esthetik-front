import Button from "../Button/Button";
import Modal from "./Modal";
import styles from "./ModalConfirmation.module.scss";

function ModalConfirmation({ isOpen, onClose, message, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <p>{message}</p>
        <div className={styles.btnContainer}>
          <Button
            onClick={onConfirm}
            style={{
              padding: "7px 15px",
              marginRight: "5px",
              fontSize: "0.8rem",
            }}
            color="var(--secondary-color)"
          >
            Confirmer
          </Button>
          <Button
            onClick={onClose}
            style={{
              padding: "7px 15px",
              marginLeft: "5px",
              fontSize: "0.8rem",
            }}
            color="var(--secondary-color)"
          >
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalConfirmation;
