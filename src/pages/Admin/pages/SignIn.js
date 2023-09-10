import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authenticate } from "../../../api/admin";
import { useAuth } from "../../../contexts/AuthContext";
function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await authenticate(values);
        if (data.adminId && data.token) {
          login(data.token);
          navigate("/admin");
        }
      } catch (error) {
        console.error("Erreur lors de l'authentification : ", error);
      }
      formik.resetForm();
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Connexion</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className={styles.error}>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className={styles.button}>
            <button type="submit" disabled={formik.isSubmitting}>
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
