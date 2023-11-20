import axiosInstance from "./axiosInstance";

export const fetchAddressSuggestions = async (inputText) => {
  try {
    const response = await axiosInstance.get(
      `/autocomplete?q=${encodeURIComponent(inputText)}`
    );
    console.log("data in call api", response.data);
    return response.data;
  } catch (error) {
    const { message } = error.response.data;
    console.error(
      "Erreur lors de la récupération des suggestions d'adresse : ",
      message
    );
    return error.message;
  }
};

// function debounce(func, delay) {
//   let timer;
//   return function () {
//     const context = this;
//     const args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(() => func.apply(context, args), delay);
//   };
// }

// export const debouncedFetchAddressSuggestions = debounce((inputText) => {
//   fetchAddressSuggestions(inputText);
// }, 500);
