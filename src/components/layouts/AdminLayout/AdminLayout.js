import Sidebar from "../../Sidebar/Sidebar";
import styles from "./AdminLayout.module.scss";
import { useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const showSideBar = location.pathname !== "/admin/signin";

  return (
    <div className={styles.container}>
      {showSideBar && (
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
      )}
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default AdminLayout;
