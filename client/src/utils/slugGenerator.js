export const generateSlug = (title) => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, "") // Remove non-alphanumeric characters (except hyphens)
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Remove leading hyphen if any
    .replace(/-+$/, ""); // Remove trailing hyphen if any
};
