require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// Configure CORS to allow requests from your frontend
const corsOptions = {
  origin: "http://localhost:5173", // React app's origin
  methods: ["GET", "POST"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

app.post("/generate-recipe", async (req, res) => {
  const { dish, filters } = req.body;

  const prompt = `Create a recipe for ${dish} with filters ${JSON.stringify(
    filters
  )}. Include ingredients and preparation steps also include title of recipe.`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const recipe = await model.generateContent(prompt);
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
