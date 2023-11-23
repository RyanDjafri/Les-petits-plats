// importation des fonctions nécessaires fetch, template des repas
import { fetchData } from "../api/fetchData.js";
import { mealTemplate } from "../template/mealTemplate.js";

// constantes pour la page
const ingredientsList = document.querySelector("#list-i");
const appareilsList = document.querySelector("#list-a");
const ustensilsList = document.querySelector("#list-u");
const recipeNumber = document.getElementById("recipes-number");
const categories = document.querySelectorAll(".category");
const lists = document.querySelectorAll(".list");
const selectedContainer = document.querySelector(".selected-options");

// fonction gérant mes inputs d'options de recherches
async function handleInputs() {
  const listInputs = document.querySelectorAll(".search-input");
  const cancels = document.querySelectorAll(".cancel-input");

  listInputs.forEach((input, i) => {
    const cancel = cancels[i];

    input.addEventListener("input", () => {
      if (input.value.length > 2) {
        cancel.style.display = "block";
      } else {
        cancel.style.display = "none";
      }

      if (cancel.style.display === "block") {
        cancel.addEventListener("click", () => {
          input.value = "";
          cancel.style.display = "none";
          resetList(input, cancel);
        });
      }
    });
  });
}

// fonction permettant la réinitialisation des inputs de recherches(appareils, ingredients, ustensiles)
function resetList(input, cancel) {
  const listContainer = input.parentElement.parentElement.parentElement;
  const list = listContainer.querySelectorAll(".list-item");
  if (list) {
    list.forEach((item) => {
      item.style.display = "block";
      cancel.style.display = "none";
    });
  } else {
    console.error("List element not found. Input:", list);
  }
}

async function getData() {
  try {
    const meals = await fetchData();
    recipeNumber.textContent = meals.length;
    return meals;
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return null;
  }
}

getData();

categories.forEach((category, i) => {
  category.addEventListener("click", () => {
    const clickedList = lists[i];
    clickedList.classList.toggle("list-box");
    if (clickedList.classList.contains("list-box")) {
      categories[i].parentElement.style.borderRadius = "11px 11px 0 0";
      category.querySelector(".chevron").src =
        "../../assets/icons/vector-up.svg";
      clickedList.style.display = "block";
    } else {
      categories[i].parentElement.style.borderRadius = "11px";
      category.querySelector(".chevron").src = "./assets/icons/Vector1.svg";
      clickedList.style.display = "none";
    }
  });
});

// affichage des ingredients, event listener pour ajouter dans la liste des options sélectionnés
async function getAllIngredients() {
  const data = await getData();
  const selectedIngredients = [];
  const ingredients = data.reduce((acc, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const { ingredient: currentIngredient } = ingredient;
      if (
        !acc.includes(currentIngredient) &&
        !selectedIngredients.includes(currentIngredient)
      ) {
        acc.push(currentIngredient);
        ingredientsList.innerHTML += `
          <li class="list-item">${currentIngredient}</li>
        `;
      }
    });
    return acc;
  }, []);

  const input = document.getElementById("list-input-ingredients");
  const ingredientsListItems = document.querySelectorAll("#list-i .list-item");

  input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    ingredientsListItems.forEach((listItem) => {
      const listItemText = listItem.textContent.toLowerCase();
      listItem.style.display = listItemText.includes(value) ? "block" : "none";
    });
  });

  ingredientsListItems.forEach((listItem) => {
    listItem.addEventListener("click", () => {
      const selected = listItem.textContent;
      if (!selectedIngredients.includes(selected)) {
        selectedIngredients.push(selected);
        selectedContainer.innerHTML += `
          <div class="selected-item">
            <p class="selected">${selected}</p>
            <img src="../../assets/icons/close-item.svg" alt="close-icon" class="close-icon-item"/>
          </div>
        `;
        filterMeals();
      } else {
        console.log(`${selected} is already selected.`);
      }
      const closeIconItem = document.querySelector(".close-icon-item");
      closeIconItem.addEventListener("click", () => {
        const item = closeIconItem.parentNode;
        item.remove();
        const index = selectedIngredients.indexOf(selected);
        selectedIngredients.splice(index, 1);
      });
    });
  });
  await handleInputs();
}

// affichage des appareils, event listener pour ajouter dans la liste des options sélectionnés
async function getAllAppareils() {
  const data = await getData();
  const appliances = data.reduce((acc, recipe) => {
    if (!acc.includes(recipe.appliance)) {
      acc.push(recipe.appliance);
    }
    return acc;
  }, []);
  const selectedAppareils = [];
  appliances.forEach((appliance) => {
    appareilsList.innerHTML += `
    <li class="list-item">${appliance}</li>
    `;

    const input = document.getElementById("list-input-appareils");
    const appareilsListItems = document.querySelectorAll("#list-a .list-item");
    input.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      appareilsListItems.forEach((listItem) => {
        const listItemText = listItem.textContent.toLowerCase();
        listItem.style.display = listItemText.includes(value)
          ? "block"
          : "none";
      });
    });

    appareilsListItems.forEach((listItem) => {
      listItem.addEventListener("click", () => {
        const selected = listItem.textContent;
        if (!selectedAppareils.includes(selected)) {
          selectedAppareils.push(selected);
          selectedContainer.innerHTML += `
            <div class="selected-item">
              <p class="selected">${selected}</p>
              <img src="../../assets/icons/close-item.svg" alt="close-icon" class="close-icon-item"/>
            </div>
          `;
          filterMeals();
        } else {
          console.log(`${selected} is already selected.`);
        }
        const closeIconItem = document.querySelector(".close-icon-item");
        closeIconItem.addEventListener("click", () => {
          const item = closeIconItem.parentNode;
          item.remove();
          const index = selectedAppareils.indexOf(selected);
          selectedAppareils.splice(index, 1);
        });
      });
    });
  });
  await handleInputs();
}

// affichage des ustensiles, event listener pour ajouter dans la liste des options sélectionnés
async function getAllUstensils() {
  const data = await getData();
  const ustensils = data.reduce((acc, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!acc.includes(ustensil)) {
        acc.push(ustensil);
      }
    });
    return acc;
  }, []);
  const selectedUstensils = [];
  ustensils.forEach((ustensil) => {
    ustensilsList.innerHTML += `
      <li class="list-item">${ustensil}</li>
    `;
  });

  const input = document.getElementById("list-input-ustensils");
  const ustensilsListItems = document.querySelectorAll("#list-u .list-item");
  input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();
    ustensilsListItems.forEach((listItem) => {
      const listItemText = listItem.textContent.toLowerCase().trim();
      listItem.style.display = listItemText.includes(value) ? "block" : "none";
    });
  });

  ustensilsListItems.forEach((listItem) => {
    listItem.addEventListener("click", () => {
      const selected = listItem.textContent;
      if (!selectedUstensils.includes(selected)) {
        selectedUstensils.push(selected);
        selectedContainer.innerHTML += `
          <div class="selected-item">
            <p class="selected">${selected}</p>
            <img src="../../assets/icons/close-item.svg" alt="close-icon" class="close-icon-item"/>
          </div>
        `;
        filterMeals();
      } else {
        console.log(`${selected} is already selected.`);
      }
      const closeIconItem =
        selectedContainer.lastElementChild.querySelector(".close-icon-item");
      closeIconItem.addEventListener("click", () => {
        const item = closeIconItem.parentNode;
        item.remove();
        const index = selectedUstensils.indexOf(selected);
        selectedUstensils.splice(index, 1);
      });
    });
  });
  await handleInputs();
}

getAllIngredients();
getAllAppareils();
getAllUstensils();

// fonction récupérant toutes les options sélectionnées (ingredients, appareils, ustensiles)
export async function getAllSelectedOptions() {
  const selectedItemsContainer =
    selectedContainer.querySelectorAll(".selected-item");
  const selectedOptions = [];

  selectedItemsContainer.forEach((item) => {
    const closeIcon = item.querySelector(".close-icon-item");
    selectedOptions.push(item.textContent.trim());
    closeIcon.addEventListener("click", () => {
      const index = selectedOptions.indexOf(item.textContent.trim());
      if (index !== -1) {
        selectedOptions.splice(index, 1);
      }
      console.log("Updated selectedOptions:", selectedOptions);
      item.remove();
      filterMeals();
    });
  });
  return selectedOptions;
}

const searchBar = document.getElementById("meal");

searchBar.addEventListener("input", () => {
  filterMeals();
});

// fonction filtrant les repas grâce à l'input ou les options sélectionnés
export async function filterMeals() {
  const allMeals = await getData();
  const selectedOptions = await getAllSelectedOptions();
  const value = searchBar.value.toLowerCase();

  const filteredMeals = allMeals.filter((meal) => {
    const mealName = meal.name.toLowerCase();
    const mealDescription = meal.description.toLowerCase();
    const mealIngredients = meal.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );
    return (
      (value.length === 0 ||
        mealName.includes(value) ||
        mealDescription.includes(value) ||
        mealIngredients.some((ingredient) => ingredient.includes(value))) &&
      selectedOptions.every(
        (option) =>
          mealIngredients.includes(option.toLowerCase()) ||
          [meal.appliance.toLowerCase()].includes(option.toLowerCase()) ||
          meal.ustensils
            .map((ustensil) => ustensil.toLowerCase())
            .includes(option.toLowerCase())
      )
    );
  });

  console.log("Selected options:", selectedOptions);
  console.log("Filtered meals based on selected options:", filteredMeals);

  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";

  filteredMeals.forEach((meal) => {
    const mealModel = mealTemplate(meal);
    const mealCardDOM = mealModel.getMealCardDOM();
    mealsContainer.appendChild(mealCardDOM);
  });
  recipeNumber.textContent = filteredMeals.length;
}
