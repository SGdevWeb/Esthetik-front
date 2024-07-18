import React, { useEffect, useState } from "react";
import styles from "./PrestationCard.module.scss";
import { useLocation } from "react-router-dom";
import Button from "../../Button/Button";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PrestationCard({ title, price, index, onEdit, onDelete }) {
  const isEven = index % 2 === 0;
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const isAdminPath = location.pathname.startsWith("/admin");

  const cardStyles =
    windowWith >= 1025
      ? {
          paddingRight: isEven ? "30px" : 0,
          paddingLeft: !isEven ? "30px" : 0,
        }
      : {};

  return (
    <div className={styles.container} style={cardStyles}>
      <div className={styles.titleAndPrice}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.dotted}></div>
        <div className={styles.price}>{price}</div>
        {isAdminPath && (
          <div className={styles.actions}>
            <Button
              onClick={onEdit}
              color="var(--primary-color)"
              style={{ padding: "5px 10px" }}
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </Button>
            <Button
              onClick={onDelete}
              color="var(--primary-color)"
              style={{ padding: "5px 10px", width: "44px" }}
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </Button>
          </div>
        )}
      </div>
      <div className={styles.description}></div>
    </div>
  );
}

export default PrestationCard;
