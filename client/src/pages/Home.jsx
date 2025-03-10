import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchRandomRecipes,
  fetchRecipesBySearch,
  generateRecipeByAI,
} from "../utils/apiList";
import RecipeCardLoader from "../components/RecipeCardLoader";
import { generateSlug } from "../utils/slugGenerator";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9; // Number of recipes per page

  // AI Recipe States
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiDish, setAiDish] = useState("");
  const [aiFilters, setAiFilters] = useState("");
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);

  const fetchRandomRecipesData = async () => {
    setLoading(true);
    const recipesData = await fetchRandomRecipes(100);
    setRecipes(recipesData.results);
    setTotalRecipes(recipesData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomRecipesData();
  }, []);

  const fetchRecipes = async (query) => {
    setLoading(true);
    const fetchSearchRecipes = await fetchRecipesBySearch(query);
    setRecipes(fetchSearchRecipes);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchRecipes(searchQuery);
    } else {
      fetchRandomRecipes();
    }
  };

  // Handle AI Recipe Generation
  const generateAiRecipe = async (e) => {
    e.preventDefault();
    setAiLoading(true);
    const recipeData = await generateRecipeByAI(
      aiDish,
      aiFilters.split(",").map((filter) => filter.trim())
    );
    navigate("/ai-recipe", { state: { aiRecipe: recipeData } });
    setAiLoading(false);
  };

  // Get current page's items
  const offset = currentPage * itemsPerPage;
  const currentRecipes = recipes?.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <section className="w-[70%] mx-auto my-10 max-[1000px]:w-11/12">
        <div className="flex flex-col justify-center">
          <h3 className="text-6xl text-center max-md:text-4xl max-md:font-semibold text-neutral-700 !leading-[3.2rem]">
            Search among{" "}
            <span className="bg-neutral-700 text-white px-3 py-1 rounded-md">
              {totalRecipes}
            </span>{" "}
            recipes
          </h3>
          <form className="w-full mt-10" onSubmit={handleSearch}>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-neutral-700 text-xl">
                Search for a recipe
              </label>
              <div className="flex justify-between gap-2 items-center">
                <input
                  type="text"
                  placeholder="Enter a recipe"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-200 outline-none h-12 rounded-md px-4 focus:outline-neutral-700"
                />
                <button
                  type="submit"
                  className="bg-neutral-600 text-white px-4 py-3 font-medium rounded-md h-full hover:bg-neutral-800"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* AI Recipe Button */}
          <button
            onClick={() => setAiModalOpen(true)}
            className="bg-green-600 text-white px-4 py-3 font-medium rounded-md mt-4 hover:bg-green-800"
          >
            Generate Recipe with AI
          </button>
        </div>

        {/* Recipe cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {currentRecipes?.length > 0 ? (
            !loading ? (
              currentRecipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer flex flex-col"
                >
                  <figure className="relative">
                    <img
                      src={recipe?.image}
                      alt={recipe?.title}
                      className="w-full object-cover"
                    />
                    {recipe?.veryPopular && (
                      <span className="bg-neutral-700 px-3 py-1 rounded-md text-white absolute top-2 left-2">
                        Popular
                      </span>
                    )}
                  </figure>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 hover:text-neutral-600 transition-colors duration-200">
                      {recipe?.title?.length > 50
                        ? recipe?.title?.slice(0, 50) + "..."
                        : recipe?.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {recipe?.summary
                        ?.replace(/(<([^>]+)>)/gi, "")
                        .slice(0, 50)}
                      ...
                    </p>

                    <div className="mt-4">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="block text-center bg-neutral-700 text-white py-3 rounded-md font-medium hover:bg-neutral-800"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <RecipeCardLoader />
            )
          ) : (
            <p className="col-span-full text-center text-lg text-gray-600">
              No recipes found!
            </p>
          )}
        </div>

        {/* AI Recipe Modal */}
        {aiModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">Generate AI Recipe</h2>
              <form onSubmit={generateAiRecipe}>
                <input
                  type="text"
                  placeholder="Enter dish name"
                  value={aiDish}
                  onChange={(e) => setAiDish(e.target.value)}
                  className="w-full border p-2 mb-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Filters (comma separated)"
                  value={aiFilters}
                  onChange={(e) => setAiFilters(e.target.value)}
                  className="w-full border p-2 mb-2 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded"
                >
                  {aiLoading ? "Generating..." : "Generate"}
                </button>
              </form>
              <button
                className="w-full mt-2 bg-gray-400 text-white py-2 rounded"
                onClick={() => setAiModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Pagination */}
        {currentRecipes?.length > 0 && (
          <div className="flex justify-center items-center mt-8 overflow-x-auto px-2">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={Math.ceil(recipes?.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={
                "flex justify-center items-center gap-2 sm:gap-4 flex-wrap"
              }
              pageClassName={
                "px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base rounded-md border border-gray-300 hover:bg-neutral-700 hover:text-white cursor-pointer"
              }
              activeClassName={"bg-neutral-700 text-white"}
              previousClassName={
                "px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base rounded-md border border-gray-300 hover:bg-neutral-700 hover:text-white cursor-pointer"
              }
              nextClassName={
                "px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base rounded-md border border-gray-300 hover:bg-neutral-700 hover:text-white cursor-pointer"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
