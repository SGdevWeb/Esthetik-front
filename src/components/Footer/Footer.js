import React from "react";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faInstagramSquare,
  faSnapchatSquare,
} from "@fortawesome/free-brands-svg-icons";

const Mailto = ({ email, subject = "", body = "", children }) => {
  let params = subject || body ? "?" : "";
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

  return <a href={`mailto:${email}${params}`}>{children}</a>;
};

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <div className={styles.left}>
          <FontAwesomeIcon className={styles.icon} icon={faPhone} />
          <p>06 04 19 75 61</p>
        </div>
        <div className={styles.middle}>
          <FontAwesomeIcon className={styles.icon} icon={faSnapchatSquare} />
          <FontAwesomeIcon className={styles.icon} icon={faFacebookSquare} />
          <FontAwesomeIcon className={styles.icon} icon={faInstagramSquare} />
        </div>
        <div className={styles.right}>
          <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          <p>
            <Mailto email="virginie.ballini@gmail.com">
              virginie.ballini@gmail.com
            </Mailto>
          </p>
        </div>
      </div>
      <div className={styles.author}>
        <span>
          <i className="fa-regular fa-copyright"></i>
          {new Date().getFullYear()} - Tous droits réservés.
        </span>
        <span>
          {" "}
          Site réalisé par
          <a
            href="http://samuelgustin.fr"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Samuel Gustin
          </a>
        </span>
      </div>
    </div>
  );
}

export default Footer;
