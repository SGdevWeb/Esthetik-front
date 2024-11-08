import React from "react";
import styles from "./Cards.module.scss";
import Card from "./Card/Card";
import prestationImages from "../../utils/prestationImages";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Cards({ title, data }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.cards}>
        {data.map((rate) => (
          <Card
            key={rate.id}
            href={`${baseUrl}/prestations/${rate.name
              .split(" ")
              .join("_")
              .toLowerCase()}`}
            imgUrl={prestationImages[rate.img_name]}
            imgTitle={rate.img_title}
            title={rate.name}
            description={rate.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Cards;
