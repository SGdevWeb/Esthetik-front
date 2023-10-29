import * as Yup from "yup";
import { LASTNAME, FIRSTNAME, EMAIL } from "../utils/regex";

export default Yup.object({
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
  email: Yup.string()
    .required("Votre email est requis")
    .matches(EMAIL, "Veuillez fournir une adresse email valide"),
});
