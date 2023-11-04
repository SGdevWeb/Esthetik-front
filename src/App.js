import styles from "./App.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout/AdminLayout";
import PublicLayout from "./components/layouts/PublicLayout/PublicLayout";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const Layout = isAdminRoute ? AdminLayout : PublicLayout;

  return (
    <div className={styles.appContainer}>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
