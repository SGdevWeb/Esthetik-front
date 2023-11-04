import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};

export default AdminLayout;
