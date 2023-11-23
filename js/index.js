// importation des fonctions nécessaires pour la fonctionnalité principale(fetch, display de la data)
import { fetchData } from "./api/fetchData.js";
import { mealTemplate } from "./template/mealTemplate.js";

// fonction asynchrone pour display la data à l'aide d'un modèle de card pour chaque repas
async function displayData(data) {
  const mealsSection = document.querySelector("#meals-container");
  for (let i = 0; i < data.length; i++) {
    const meal = data[i];
    const mealModel = mealTemplate(meal);
    const mealCardDOM = mealModel.getMealCardDOM();
    mealsSection.appendChild(mealCardDOM);
  }
}
// fonction initialisant l'affichage de ma data
export async function init() {
  const data = await fetchData();
  displayData(data);
}

init();
