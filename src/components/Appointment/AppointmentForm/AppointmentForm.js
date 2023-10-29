import styles from "./AppointmentForm.module.scss";
import { useFormik } from "formik";
import validationSchema from "../../../models/AppointmentSchema";
import InputCustom from "../../InputCustom/InputCustom";
import SlotBookingForm from "../SlotBookingForm/SlotBookingForm";
import { useEffect, useState } from "react";
import { fetchRates } from "../../../api/rates";
import { fetchServicesByRateId } from "../../../api/services";
import Chip from "../../Chip/Chip";

function AppointmentForm() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRates();
      setRates(data);
    };

    fetchData();
  }, []);

  const [rates, setRates] = useState("");
  const [services, setServices] = useState([]);
  const [chips, setChips] = useState([]);
  const [selectedRate, setSelectedRate] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [hasAddedService, setHasAddedService] = useState(false);
  const [serviceError, setServiceError] = useState("");

  const handleRateChange = (e) => {
    setSelectedRate(e.target.value);
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleDateChange = (date) => {
    formik.setFieldValue("selectedDate", date);
  };

  const handleSlotChange = (slot) => {
    formik.setFieldValue("selectedSlot", slot);
  };

  const onSubmit = async (formValues) => {
    console.log(formValues);
    if (chips.length === 0) {
      setServiceError("Veuillez ajouter au moins une prestation");
      return;
    }
    setChips([]);
    setHasAddedService(false);
    setServiceError("");
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      selectedDate: "",
      selectedSlot: "",
      services: [],
    },
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedRate) {
        const data = await fetchServicesByRateId(selectedRate);

        setServices(data);
      } else {
        setServices([]);
      }
    };

    fetchData();
  }, [selectedRate]);

  const addChip = () => {
    if (selectedRate && selectedService) {
      const rate = rates.find((rate) => rate.id.toString() === selectedRate);
      const service = services.find(
        (service) => service.id.toString() === selectedService
      );
      if (rate && service) {
        const newChips = [
          ...chips,
          { rate: rate.name, service: service.title },
        ];
        setChips(newChips);
        formik.setFieldValue("services", [
          ...formik.values.services,
          { rateId: rate.id, serviceId: service.id },
        ]);
        setSelectedRate("");
        setSelectedService("");
        setServices([]);
        setHasAddedService(true);
      }
    }
  };

  const removeChip = (index) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);

    const newServices = [...formik.values.services];
    newServices.splice(index, 1);
    formik.setFieldValue("services", newServices);

    if (newChips.length === 0) {
      setHasAddedService(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Rendez-vous en ligne</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <InputCustom
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Nom"
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
            placeholder="Prénom"
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
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.addService}>
          <h3>Ajouter une prestation</h3>
          <div>
            <select
              name="selectedRate"
              onChange={handleRateChange}
              value={selectedRate}
            >
              <option value="">Sélectionner un type de prestation</option>
              {rates &&
                rates.map((rate) => (
                  <option key={rate.id} value={rate.id}>
                    {rate.name}
                  </option>
                ))}
            </select>
          </div>
          {selectedRate && (
            <div>
              <select
                name="selectedService"
                onChange={handleServiceChange}
                value={selectedService}
              >
                <option value="">Sélectionner une prestation</option>
                {services &&
                  services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {selectedRate && selectedService && (
            <div className={styles.btnContainer}>
              <button type="button" onClick={addChip}>
                Ajouter
              </button>
            </div>
          )}
        </div>
        {serviceError && !hasAddedService && (
          <div className={styles.error}>{serviceError}</div>
        )}
        {chips &&
          chips.map((chip, index) => (
            <Chip
              key={index}
              label={`${chip.rate} - ${chip.service}`}
              onDelete={() => removeChip(index)}
            />
          ))}
        <div className={styles.addSlot}>
          <h3>Choisir un créneau</h3>
          <SlotBookingForm
            selectedDate={formik.values.selectedDate}
            selectedSlot={formik.values.selectedSlot}
            onDateChange={handleDateChange}
            onSlotChange={handleSlotChange}
          />
        </div>
        {formik.touched.selectedSlot && formik.errors.selectedSlot ? (
          <div className={styles.error}>{formik.errors.selectedSlot}</div>
        ) : null}
        <div className={styles.btnContainer}>
          <button disabled={formik.isSubmitting} type="submit">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
