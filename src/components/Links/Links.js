import styles from "./Links.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

function Links() {
  return (
    <div className={styles.container}>
      <a className={styles.iconContainer} href="tel:+33604197561">
        <FontAwesomeIcon className={styles.icon} icon={faPhone} />
      </a>
      <a
        className={styles.iconContainer}
        href="https://www.facebook.com/profile.php?id=61550820907631"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon className={styles.icon} icon={faFacebookSquare} />
      </a>
      <a
        className={styles.iconContainer}
        href="mailto:contact@éclatdebeauté.fr"
      >
        <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
      </a>
    </div>
  );
}

export default Links;
