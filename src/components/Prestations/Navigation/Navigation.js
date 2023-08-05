// import React from "react";
// import styles from "./Navigation.module.scss";
// import dataTarif from "../../../data/tarif.json";
// import { NavLink } from "react-router-dom";
// import Dropdown from "../Dropdown/Dropdown";
// import Forfait from "../Forfait/Forfait";

// function Navigation() {
//   return (
//     <>
//       <div className={styles.container}>
//         <ul>
//           {dataTarif.map((element, index) => (
//             <li key={index}>
//               <NavLink
//                 className={styles.navlink}
//                 to={`/prestations/${element.service.split(" ").join("_")}`}
//               >
//                 {element.service}
//               </NavLink>
//               <div className={styles.dropdown}>
//                 <Dropdown
//                   title={element.service}
//                   content={element.prestations}
//                 />
//               </div>
//             </li>
//           ))}
//           <li className={styles.package}>
//             <NavLink className={styles.navlink} to="/prestations/forfait">
//               Forfait
//             </NavLink>
//             <div className={`${styles.forfaitCard} d-flex flex-column mt-20`}>
//               <h2 className={styles.sectionTitle}>FORFAIT</h2>
//               <Forfait />
//             </div>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Navigation;

/* Test avec la bdd */

import React, { useEffect, useState } from "react";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
// import Dropdown from "../Dropdown/Dropdown";
import Forfait from "../Forfait/Forfait";
import axios from "axios";

function Navigation() {
  const [tarifs, setTarifs] = useState([]);

  useEffect(() => {
    // Fonction pour effectuer la requête GET vers l'API pour récupérer les tarifs
    const fetchTarifs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/rates"); // Remplacez "/api/tarifs" par l'endpoint réel de votre API pour récupérer les tarifs
        console.log(response.data);
        setTarifs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tarifs :", error);
      }
    };

    fetchTarifs();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <ul>
          {tarifs.map((tarif) => (
            <li key={tarif.id}>
              <NavLink
                className={styles.navlink}
                to={`/prestations/${tarif.name.split(" ").join("_")}`}
              >
                {tarif.name}
              </NavLink>
              {/* <div className={styles.dropdown}>
                <Dropdown title={tarif.service} content={tarif.prestations} />
              </div> */}
            </li>
          ))}
          <li>
            <NavLink className={styles.navlink} to="/prestations/forfait">
              Forfait
            </NavLink>
            <div className={`${styles.forfaitCard} d-flex flex-column mt-20`}>
              <h2 className={styles.sectionTitle}>FORFAIT</h2>
              <Forfait />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navigation;
