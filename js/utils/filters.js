import { fetchData } from "../api/fetchData.js";

const ingredientsList = document.querySelector(".list-i");
const appareilsList = document.querySelector(".list-a");
const ustensilsList = document.querySelector(".list-u");
const recipeNumber = document.getElementById("recipes-number");

async function getData() {
  try {
    const meals = await fetchData();
    console.log(meals);
    return meals;
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return null;
  }
}

getData();
