import React from "react";
import styles from "./Presentation.module.scss";
import logo from "../../../assets/images/logo.png";

function Presentation() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Eclat de beauté" />
      <article className={styles.text}>
        <p>
          Je suis Virginie, esthéticienne à domicile diplômée depuis 15 ans.
          Grâce à mon expérience en instituts de beauté et en spa, je suis en
          mesure de vous offrir les meilleurs soins pour vous permettre de vous
          évader et de vous ressourcer en toute tranquillité.
        </p>
        <p>
          Je suis passionnée par mon métier et je mets tout en œuvre pour vous
          offrir une expérience unique et personnalisée. Je me déplace à votre
          domicile dans un rayon de 10 kms autour de Valenciennes, afin de vous
          offrir un service sur mesure et adapté à vos besoins.
        </p>
        <p>
          Offrez-vous un moment de détente et de bien-être en prenant
          rendez-vous dès maintenant. Je me ferai un plaisir de vous chouchouter
          et de vous offrir un total lâcher-prise.
        </p>
      </article>
    </div>
  );
}

export default Presentation;
