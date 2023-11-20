import { fetchData } from "./api/fetchData.js";
import { mealTemplate } from "./template/mealTemplate.js";

async function displayData(data) {
  const mealsSection = document.querySelector("#meals-container");
  for (let i = 0; i < data.length; i++) {
    const meal = data[i];
    const mealModel = mealTemplate(meal);
    const mealCardDOM = mealModel.getMealCardDOM();
    mealsSection.appendChild(mealCardDOM);
  }
}

export async function init() {
  const data = await fetchData();
  displayData(data);
}

init();
