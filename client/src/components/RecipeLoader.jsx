const RecipeLoader = () => {
  return (
    <section className="px-6 py-10 w-[95%] mx-auto flex justify-between max-lg:flex-col gap-5 max-sm:px-5 max-sm:w-full">
      {/* Left Section (Recipe Details) */}
      <div className="w-[65%] max-lg:w-full">
        {/* Image Loader */}
        <div className="w-full">
          <figure className="w-full h-80 rounded-lg overflow-hidden bg-gray-200 animate-pulse"></figure>
        </div>

        {/* Recipe Info */}
        <div className="w-full mt-3 flex flex-col gap-3">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>

          {/* Meta Info */}
          <div className="flex items-center justify-between my-5 gap-5 flex-wrap">
            <div className="flex gap-5 flex-wrap">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex flex-col lg:flex-row gap-12 my-7">
          <div className="w-full lg:w-1/3">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-6 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section (Similar Recipes) */}
      <div className="w-[30%] max-lg:w-full border border-zinc-200 px-6 py-5 rounded-xl bg-white h-fit">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>

        <ul className="flex flex-col max-lg:grid max-lg:grid-cols-3 max-lg:flex-wrap max-sm:grid-cols-2 max-[400px]:grid-cols-1 gap-5 mt-5">
          {[...Array(4)].map((_, index) => (
            <li key={index}>
              <div className="flex gap-4 items-center max-lg:flex-col">
                <figure className="w-[35%] h-20 bg-gray-200 rounded-md animate-pulse"></figure>
                <div className="w-[65%] max-lg:w-full">
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RecipeLoader;
