import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
