import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaClock } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const RecipeDetails = () => {
  const { slug } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomLoading, setRandomLoading] = useState(false);
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const fetchRecipes = async (slug) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${slug}&addRecipeInformation=true&addRecipeInstructions=true`
      );
      console.log(response.data);
      setRecipes(response.data.results[0]);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes(slug);
  }, [slug]);

  const fetchRandomRecipes = async () => {
    setRandomLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true`
      );
      console.log(response.data);
      setRandomRecipes(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setRandomLoading(false);
    }
  };
  console.log("random recipes: ", randomRecipes);

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  console.log("recipe details", recipes);
  // console.log("recipe details id", recipes.id);
  const generateSlug = (title) => {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading/trailing spaces
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "") // Remove non-alphanumeric characters (except hyphens)
      .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, "") // Remove leading hyphen if any
      .replace(/-+$/, ""); // Remove trailing hyphen if any
  };

  return (
    <>
      <section className="px-6 py-10 max-w-[95%] mx-auto flex justify-between gap-5">
        {!loading ? (
          <div className="w-[65%]">
            <div className="">
              <div className="w-full ">
                <figure className="w-full h-80 rounded-lg overflow-hidden">
                  <img
                    src={recipes?.image}
                    alt={recipes?.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </div>
              {/* recipes? Info */}
              <div className="w-full mt-3 flex flex-col gap-3">
                <h1 className="text-3xl font-semibold text-neutral-800">
                  {recipes?.title}
                </h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: recipes?.summary,
                  }}
                  className="prose max-w-none"
                ></div>

                <div className="flex items-center justify-between my-5">
                  <div className=" flex gap-6">
                    <div className="flex items-center gap-2 text-neutral-600">
                      <FaClock className="text-xl text-neutral-500" />
                      <span>{recipes?.readyInMinutes} mins</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <FaUtensils className="text-xl text-neutral-500" />
                      <span>{recipes?.servings} servings</span>
                    </div>
                  </div>
                  {/* Health Score and Popularity */}
                  <div className=" flex gap-4">
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-xl text-green-500" />
                      <span className="text-neutral-700">
                        {recipes?.spoonacularScore?.toFixed(1)}% Healthy
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-700">
                        Likes: {recipes?.aggregateLikes}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <Link
                      to={recipes?.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-neutral-700 px-3 py-2 rounded-md text-sm"
                    >
                      View Source
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-12 my-7">
              <div className="w-full lg:w-1/3">
                <h3 className="text-xl font-semibold text-neutral-700">
                  Cuisines
                </h3>
                <p className="mt-2 text-neutral-600">
                  {recipes?.cuisines?.length > 0
                    ? recipes?.cuisines?.join(", ")
                    : "No Cuisine"}
                </p>
              </div>
              <div className="w-full lg:w-1/3">
                <h3 className="text-xl font-semibold text-neutral-700">
                  Occasions
                </h3>
                <p className="mt-2 text-neutral-600">
                  {recipes?.occasions?.join(", ")}
                </p>
              </div>
              <div className="w-full lg:w-1/3">
                <h3 className="text-xl font-semibold text-neutral-700">
                  Dish Types
                </h3>
                <p className="mt-2 text-neutral-600">
                  {recipes?.dishTypes?.join(", ")}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-neutral-800">
                Instructions
              </h2>
              <div className="mt-6 space-y-4">
                {recipes?.analyzedInstructions?.[0]?.steps?.length > 0 ? (
                  recipes.analyzedInstructions[0].steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="text-xl font-bold text-neutral-700">
                        {step.number}
                      </span>
                      <div className="flex-1">
                        <p className="text-lg text-neutral-800">{step.step}</p>
                        {step.ingredients && step.ingredients.length > 0 && (
                          <div className="mt-2">
                            <h3 className="text-lg font-semibold text-neutral-700">
                              Ingredients
                            </h3>
                            <p className=" text-neutral-600">
                              {step.ingredients
                                .map((ingredient) => ingredient.localizedName)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No instructions available.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <p className="col-span-full  text-lg text-gray-600">
              Loading Recipes...
            </p>
          </div>
        )}
        <div className="w-[30%] border border-zinc-200 px-6 py-5 rounded-xl bg-white h-fit">
          <h4 className="text-xl font-bold text-neutral-700">
            Similiar Recipes
          </h4>

          <ul className="flex flex-col gap-5 mt-5">
            {!randomLoading ? (
              randomRecipes.map((recipe, index) => (
                <li key={index}>
                  <div className="flex gap-4 items-center">
                    <figure className="w-[35%] h-full">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </figure>
                    <div className="w-[65%]">
                      <Link to={`/recipe/${generateSlug(recipe.title)}`}>
                        <h2 className="text-base leading-5 font-bold text-gray-800 hover:text-neutral-600 transition-colors duration-200">
                          {recipe.title.length > 50
                            ? recipe.title.slice(0, 50) + "..."
                            : recipe.title}
                        </h2>
                      </Link>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                        {recipe.summary
                          .replace(/(<([^>]+)>)/gi, "")
                          .slice(0, 50)}
                        ...
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <p className="col-span-full  text-lg text-gray-600">
                  Loading Recipes...
                </p>
              </div>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default RecipeDetails;
