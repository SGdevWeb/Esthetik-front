import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Tarifs from "./pages/Tarifs/Tarifs";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tarif" element={<Tarifs />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
