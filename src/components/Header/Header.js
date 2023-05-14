import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} to="/">
        <div>Eclat de beaute</div>
        <div>by Virginie</div>
      </Link>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink end to="/">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/prestations">Prestations</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
