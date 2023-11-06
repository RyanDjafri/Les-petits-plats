export const fetchData = async () => {
  try {
    const response = await fetch("../../data/recipes.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const meals = await response.json();
    console.log(meals);
    return meals;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    throw error; // Rethrow the error to indicate a failure
  }
};
