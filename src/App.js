import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import TarifPage from "./pages/TarifPage/TarifPage";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tarif" element={<TarifPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
