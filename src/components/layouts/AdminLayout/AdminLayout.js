import Sidebar from "../../Sidebar/Sidebar";
import styles from "./AdminLayout.module.scss";
import { useLocation } from "react-router-dom";
import { usePageTitle } from "../../../contexts/PageTitleContext";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { pageTitle } = usePageTitle();

  const isNotSignInPage = location.pathname !== "/admin/signin";

  return (
    <div className={styles.container}>
      {isNotSignInPage && (
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
      )}
      <main className={styles.content}>
        {isNotSignInPage && <h1>{pageTitle}</h1>}
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
