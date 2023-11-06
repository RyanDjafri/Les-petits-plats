import { fetchData } from "./api/fetchData.js";
import { mealTemplate } from "./template/mealTemplate.js";

async function displayMeals(meals) {
  const mealsContainer = document.getElementById("meals-container");
  meals.forEach((meal) => {
    const mealModel = mealTemplate(meal);
    const mealCardDOM = mealModel.getMealCardDOM();
    mealsContainer.appendChild(mealCardDOM);
  });
}

async function getMeals() {
  const { meals } = await fetchData();
  displayMeals(meals);
}
getMeals();
