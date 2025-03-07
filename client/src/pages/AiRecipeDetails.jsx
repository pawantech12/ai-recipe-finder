import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const AiRecipeDetails = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [htmlContent, setHtmlContent] = useState();
  const { aiRecipe } = location.state || {};

  //   console.log(aiRecipe);

  useEffect(() => {
    const processContent = async () => {
      setLoading(true);
      try {
        const file = await unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypeFormat)
          .use(rehypeStringify);

        const htmlContent = (await file.process(aiRecipe)).toString();
        setHtmlContent(htmlContent);
      } catch (error) {
        console.error("Error processing content:", error);
      } finally {
        setLoading(false);
      }
    };

    processContent();
  }, [aiRecipe]);

  if (!aiRecipe) {
    return (
      <p className="text-center text-lg text-gray-600">
        No recipe data available.
      </p>
    );
  }

  return (
    <div className="py-10">
      <button
        onClick={() => window.history.back()}
        className="bg-neutral-600 text-white px-3 py-2 text-sm mx-12 mt-4 font-medium rounded-md hover:bg-neutral-800 flex items-center gap-1"
      >
        <IoChevronBackOutline />
        Back
      </button>
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="prose max-w-none w-9/12 mx-auto max-sm:w-11/12"
      ></div>
    </div>
  );
};

export default AiRecipeDetails;
