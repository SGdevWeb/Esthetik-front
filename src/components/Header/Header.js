import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { useState } from "react";
import HeaderMenuMobile from "./HeaderMenuMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <header className={styles.container}>
      <button onClick={toggleMenu} className={styles.headerMenuMobile}>
        <FontAwesomeIcon
          icon={showMenu ? faTimes : faBars}
          className={styles.burgerMenu}
        />
      </button>
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
