import * as Yup from "yup";
import { LASTNAME, FIRSTNAME, EMAIL, PHONE } from "../utils/regex";
import { applyTrimToAllStrings } from "../utils/applyTrimToAll";

const schema = Yup.object({
  lastName: Yup.string()
    .required("Votre nom est requis")
    .matches(
      LASTNAME,
      "Votre nom doit contenir uniquement des lettres, des acccents et espace"
    ),
  firstName: Yup.string()
    .required("Votre Prénom est requis")
    .matches(
      FIRSTNAME,
      "Votre prénom doit contenir uniquement des lettres, des accents et tirets"
    ),
  address: Yup.string()
    .required("Votre adresse est requise")
    .min(10, "L'adresse saisie semble trop courte"),
  email: Yup.string()
    .required("Votre email est requis")
    .matches(EMAIL, "Veuillez fournir une adresse email valide"),
  phoneNumber: Yup.string()
    .required("Votre numéro de téléphone est requis")
    .matches(PHONE, "Veuillez fournir un numéro de téléphone valide"),
  selectedSlot: Yup.string().required(
    "Veuillez sélectionner un créneau pour votre rdv"
  ),
});

export default applyTrimToAllStrings(schema);
