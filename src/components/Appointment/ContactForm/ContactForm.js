import { useFormik } from "formik";
import InputCustom from "../../InputCustom/InputCustom";
import styles from "./ContactForm.module.scss";
import validationSchema from "../../../models/ContactSchema";
import Button from "../../Button/Button";
import { useState } from "react";
import { sendContactEmail } from "../../../api/contact";

function ContactForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (formValues) => {
    try {
      const response = await sendContactEmail(formValues);
      if (response && response.status === 200) {
        setErrorMessage("");
        setSuccessMessage("Votre message a été envoyé avec succès.");
        formik.resetForm();
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi du formulaire de contact : ",
        error
      );
      setErrorMessage(
        error.response
          ? error.response.data.message
          : "Une erreur est survenue."
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className={styles.container}>
      <h2>Formulaire de contact</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.row}>
          <div>
            <InputCustom
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Nom"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              style={{ marginTop: "10px" }}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className={styles.error}>{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div>
            <InputCustom
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Prénom"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              style={{ marginTop: "10px" }}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className={styles.error}>{formik.errors.firstName}</div>
            ) : null}
          </div>
        </div>
        <div>
          <InputCustom
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            style={{ marginTop: "10px" }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <textarea
          name="message"
          id="message"
          placeholder="Message"
          rows="12"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
        ></textarea>
        {formik.touched.message && formik.errors.message ? (
          <div className={styles.error}>{formik.errors.message}</div>
        ) : null}
        <div className={styles.btnContainer}>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            color="var(--primary-color)"
          >
            Envoyer
          </Button>
        </div>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
