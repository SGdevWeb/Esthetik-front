import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${apiUrl}/articles`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles : ", error);
  }
};

export const fetchArticleById = async (ArticleId) => {
  try {
    const response = await axios.get(`${apiUrl}/articles/${ArticleId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article", error);
  }
};
