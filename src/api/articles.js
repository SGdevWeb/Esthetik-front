import axios from "axios";
import axiosInstance from "./axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchArticles = async () => {
  try {
    const response = await axios.get(`${apiUrl}/articles`);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles : ", error);
    throw error;
  }
};

export const fetchArticleById = async (ArticleId) => {
  try {
    const response = await axios.get(`${apiUrl}/articles/${ArticleId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article", error);
    throw error;
  }
};

export const createArticle = async (values) => {
  try {
    const response = await axiosInstance.post("/articles", values);
    return response;
  } catch (error) {
    console.log(error);
    const { message } = error.response.data;
    console.error("Erreur lors de la création de l'article : ", message);
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}`);
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la suppression de l'article : ", message);
    throw error;
  }
};

export const updateArticle = async (articleId, updatedArticle) => {
  console.log(articleId, updatedArticle);
  try {
    const response = await axiosInstance.patch(
      `/articles/${articleId}`,
      updatedArticle
    );
    return response;
  } catch (error) {
    const { message } = error.response.data;
    console.error("Erreur lors de la mise à jour de l'article : ", message);
    throw error;
  }
};
