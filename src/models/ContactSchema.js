import * as Yup from "yup";
import { EMAIL, FIRSTNAME, LASTNAME } from "../utils/regex";
import { applyTrimToAllStrings } from "../utils/applyTrimToAll";

const schema = Yup.object({
  lastName: Yup.string()
    .required("Votre nom est requis")
    .matches(
      LASTNAME,
      "Votre nom doit contenir uniquement des lettres, des acccents et espace"
    ),
  firstName: Yup.string()
    .required("Votre prénom est requis")
    .matches(
      FIRSTNAME,
      "Votre prénom doit contenir uniquement des lettres, des accents et tirets"
    ),
  email: Yup.string()
    .required("Votre email est requis")
    .matches(EMAIL, "Veuillez fournir une adresse email valide"),
  message: Yup.string()
    .required("Votre message est requis")
    .min(20, "Votre message doit contenir au moins 20 caractères")
    .max(500, "Votre message ne doit pas dépasser 500 caractères"),
});

export default applyTrimToAllStrings(schema);
