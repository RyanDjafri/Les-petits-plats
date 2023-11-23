// fonction de fetch de ma data(repas)
export async function fetchData() {
  try {
    const response = await fetch("../../data/recipes.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    throw error;
  }
}
