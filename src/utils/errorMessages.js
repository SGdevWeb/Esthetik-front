const errorMessages = {
  400: "Requête invalide. Vérifiez vos données.",
  401: "Accès non autorisé. Veuillez vous connecter.",
  403: "Accès interdit. Vous n'avez pas la permission.",
  404: (resource) => `${resource} non trouvé.`,
  500: "Erreur serveur. Veuillez réessayer plus tard.",
};

/**
 * Fonction pour obtenir un message d'erreur basé sur le code d'état.
 * @param {number} statusCode - Le code d'état de la réponse
 * @returns {string} - Le message d'erreur correspondant
 */
function getErrorMessage(statusCode, resource = "") {
  const message = errorMessages[statusCode];

  if (typeof message === "function") {
    return message(resource);
  }

  return message || "Erreur inconnue. Veuillez réessayer.";
}

export default getErrorMessage;
