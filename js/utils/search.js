import { fetchData } from "../api/fetchData.js";
import { mealTemplate } from "../template/mealTemplate.js";
import { init } from "../index.js";
const searchBar = document.getElementById("meal");
const searchIcon = document.querySelector(".search-icon-div");
const icon = document.querySelector(".search-icon");
const originalSrc = icon.src;

async function getData() {
  try {
    const meals = await fetchData();
    return meals;
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return null;
  }
}

getData();

searchIcon.addEventListener("mouseover", () => {
  icon.src = "../../assets/icons/search-hover.svg";
});

searchIcon.addEventListener("mouseout", () => {
  icon.src = originalSrc;
});

searchBar.addEventListener("input", async () => {
  const allMeals = await getData();
  const cancel = document.querySelector(".cancel");
  const value = searchBar.value.toLowerCase();
  if (searchBar.value.length > 2) {
    cancel.style.display = "block";
  } else {
    cancel.style.display = "none";
  }
  if (cancel.style.display === "block") {
    cancel.addEventListener("click", () => {
      searchBar.value = "";
      cancel.style.display = "none";
      init();
    });
  }
  if (value.length > 2) {
    const filteredMeals = allMeals.filter((meal) => {
      const mealName = meal.name.toLowerCase();
      const mealDescription = meal.description.toLowerCase();
      const mealIngredients = meal.ingredients.map((ingredient) =>
        ingredient.ingredient.toLowerCase()
      );
      return (
        mealName.includes(value) ||
        mealDescription.includes(value) ||
        mealIngredients.some((ingredient) => ingredient.includes(value))
      );
    });
    const mealsContainer = document.getElementById("meals-container");
    mealsContainer.innerHTML = "";

    for (let i = 0; i < filteredMeals.length; i++) {
      const mealModel = mealTemplate(filteredMeals[i]);
      const mealCardDOM = mealModel.getMealCardDOM();
      mealsContainer.appendChild(mealCardDOM);
    }

    recipeNumber.textContent = filteredMeals.length;
  } else {
    init();
  }
});
