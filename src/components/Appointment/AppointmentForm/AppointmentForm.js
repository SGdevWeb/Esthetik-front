import styles from "./AppointmentForm.module.scss";
import { useFormik } from "formik";
import validationSchema from "../../../models/AppointmentSchema";
import InputCustom from "../../InputCustom/InputCustom";
import SlotBookingForm from "../SlotBookingForm/SlotBookingForm";
import { useEffect, useRef, useState } from "react";
import { fetchRates } from "../../../api/rates";
import { fetchServicesByRateId } from "../../../api/services";
import Chip from "../../Chip/Chip";
import { addAppointment } from "../../../api/appointment";
import Button from "../../Button/Button";

import { fetchAddressSuggestions } from "../../../api/address";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

function AppointmentForm() {
  const [rates, setRates] = useState("");
  const [services, setServices] = useState([]);
  const [chips, setChips] = useState([]);
  const [selectedRate, setSelectedRate] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [hasAddedService, setHasAddedService] = useState(false);
  const [serviceError, setServiceError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const addressRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRates();
      setRates(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedRate) {
        const response = await fetchServicesByRateId(selectedRate);
        setServices(response.data);
      } else {
        setServices([]);
      }
    };

    fetchData();
  }, [selectedRate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addressRef.current && !addressRef.current.contains(event.target)) {
        setAddressSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const fetchAddressSuggestionsDebounced = debounce(async (inputText) => {
    const suggestions = await fetchAddressSuggestions(inputText);
    console.log("suggestions", suggestions);

    setAddressSuggestions(suggestions);
  }, 300);

  const selectAddress = (address) => {
    formik.setFieldValue("address", address);
    setAddress(address);
    setAddressSuggestions([]);
  };

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
    try {
      const response = await addAppointment(formValues);
      if (response && response.status === 200) {
        setSuccessMessage(
          "Votre demande de rendez-vous a été envoyée avec succès. Nous vous recontacterons sous peu !"
        );
      }
      setChips([]);
      setHasAddedService(false);
      setServiceError("");
      formik.resetForm();
      setAddress("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire : ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      phoneNumber: "",
      selectedDate: "",
      selectedSlot: "",
      services: [],
    },
    validationSchema,
    onSubmit,
  });

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
      <h2>Formulaire de rendez-vous</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.coordinate}>
          <h3>Coordonnées</h3>
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
          <div className={styles.autocompleteContainer} ref={addressRef}>
            <InputCustom
              id="address"
              type="text"
              name="address"
              placeholder="3 rue de l'exemple, 59300 Valenciennes"
              onChange={(e) => {
                const inputValue = e.target.value;
                setAddress(inputValue);
                if (inputValue.length >= 6) {
                  fetchAddressSuggestionsDebounced(inputValue);
                } else {
                  setAddressSuggestions([]);
                }
              }}
              value={address}
              style={{ marginTop: "20px" }}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className={styles.error}>{formik.errors.address}</div>
            ) : null}
            {addressSuggestions.length > 0 && (
              <div className={styles.dropdownMenu}>
                {addressSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.osm_id}
                    className={styles.dropdownItem}
                    onClick={() => selectAddress(suggestion.address)}
                  >
                    {suggestion.address}
                  </div>
                ))}
              </div>
            )}
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
              style={{ marginTop: "20px" }}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <InputCustom
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="Numéro de téléphone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              style={{ marginTop: "20px", marginBottom: "15px" }}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className={styles.error}>{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
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
              <Button
                type="button"
                color="var(--primary-color)"
                onClick={addChip}
              >
                Ajouter
              </Button>
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
      </form>
    </div>
  );
}

export default AppointmentForm;
