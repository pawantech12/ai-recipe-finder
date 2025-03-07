const RecipeCardLoader = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col animate-pulse">
      {/* Image Placeholder */}
      <figure className="relative w-full h-40 bg-gray-200"></figure>

      <div className="p-4">
        {/* Title Placeholder */}
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>

        {/* Description Placeholder */}
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded"></div>

        {/* Button Placeholder */}
        <div className="mt-4 h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default RecipeCardLoader;
