import axios from "axios";

const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const fetchRecipeDetailsById = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

export const fetchRandomRecipes = async (num) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=${
        num ? num : 10
      }`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipesBySearch = async (query) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeInformation=true&number=100`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

export const generateRecipeByAI = async (dish, filters) => {
  try {
    const response = await axios.post("http://localhost:3000/generate-recipe", {
      dish: dish,
      filters: filters,
    });
    const recipeData =
      response.data.response.candidates[0].content.parts[0].text;
    return recipeData;
  } catch (error) {
    console.error("Error generating AI recipe:", error);
  }
};
