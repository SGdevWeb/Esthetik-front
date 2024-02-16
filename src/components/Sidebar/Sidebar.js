import React from "react";
import styles from "./Sidebar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/admin/signin");
  }

  return (
    <div className={styles.container}>
      <section className={styles.logo}>
        <img src={logo} alt="Logo de l'institut" />
      </section>
      <section className={styles.navigation}>
        <h1>DASHBOARD</h1>
        <nav>
          <ul>
            <li>
              <Link to="/admin">Accueil</Link>
            </li>
            <li>
              <Link to="/admin/location">Secteur d'activité</Link>
            </li>
            <li>
              <Link to="/admin/prestations">Prestations</Link>
            </li>
            <li>
              <Link to="/admin/forfaits">Forfaits</Link>
            </li>
            <li>
              <Link to="/admin/promotions">Promotions</Link>
            </li>
            <li>
              <Link to="/admin/planning">Planning</Link>
            </li>
            <li>
              <Link to="/admin/articles">Articles</Link>
            </li>
          </ul>
        </nav>
      </section>
      <section className={styles.logout}>
        <Button color="var(--primary-color)" onClick={handleLogout}>
          Déconnexion
        </Button>
      </section>
    </div>
  );
}

export default Sidebar;
