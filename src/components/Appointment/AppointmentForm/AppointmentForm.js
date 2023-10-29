import styles from "./AppointmentForm.module.scss";
import { useFormik } from "formik";
import validationSchema from "../../../models/AppointmentSchema";
import InputCustom from "../../InputCustom/InputCustom";
import SlotBookingForm from "../SlotBookingForm/SlotBookingForm";

function AppointmentForm() {
  const handleDateChange = (date) => {
    formik.setFieldValue("selectedDate", date);
  };

  const handleSlotChange = (slot) => {
    formik.setFieldValue("selectedSlot", slot);
  };

  const onSubmit = async (formValues) => {
    console.log(formValues);
    formik.validateForm();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      selectedDate: "",
      selectedSlot: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <InputCustom
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Nom *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
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
            placeholder="Prénom *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className={styles.error}>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div>
          <InputCustom
            id="email"
            type="text"
            name="email"
            placeholder="email *"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <SlotBookingForm
          selectedDate={formik.values.selectedDate}
          selectedSlot={formik.values.selectedSlot}
          onDateChange={handleDateChange}
          onSlotChange={handleSlotChange}
        />
        <button
          disabled={formik.isSubmitting}
          type="submit"
          style={{
            margin: "30px auto",
          }}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
