import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useState } from "react";
import HeaderMenuMobile from "./HeaderMenuMobile";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className={styles.container}>
      <i
        onClick={() => setShowMenu(!showMenu)}
        className={
          showMenu
            ? `fa-solid fa-xmark fa-xl ${styles.headerMenuMobile}`
            : `fa-solid fa-bars fa-xl ${styles.headerMenuMobile}`
        }
      ></i>
      {showMenu && <HeaderMenuMobile setShowMenu={setShowMenu} />}
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
          <li>
            <NavLink to="/actu">Actualité</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
