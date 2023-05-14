import React from "react";
import { Link, useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className={styles.container}>
      <h1>ErrorPage</h1>
      <p>{error.message || error.statusText}</p>
      <Link className={styles.homeLink} to="/">
        Retourner sur la page d'acceuil
      </Link>
    </div>
  );
}

export default ErrorPage;
