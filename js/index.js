import { fetchData } from "./api/fetchData.js";
import { mealTemplate } from "./template/mealTemplate.js";

async function displayData(data) {
  const mealsSection = document.querySelector("#meals-container");
  data.forEach((meal) => {
    const mealModel = mealTemplate(meal);
    const userCardDOM = mealModel.getMealCardDOM();
    mealsSection.appendChild(userCardDOM);
  });
}

async function init() {
  const data = await fetchData();
  displayData(data);
}

init();
