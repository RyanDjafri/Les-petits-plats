import { fetchData } from "../api/fetchData.js";
import { mealTemplate } from "../template/mealTemplate.js";
import { init } from "../index.js";

const ingredientsList = document.querySelector("#list-i");
const appareilsList = document.querySelector("#list-a");
const ustensilsList = document.querySelector("#list-u");
const recipeNumber = document.getElementById("recipes-number");
const categories = document.querySelectorAll(".category");
const lists = document.querySelectorAll(".list");
const selectedContainer = document.querySelector(".selected-options");

async function handleInputs() {
  const listInputs = document.querySelectorAll(".search-input");
  const cancels = document.querySelectorAll(".cancel-input");

  for (let i = 0; i < listInputs.length; i++) {
    const input = listInputs[i];
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
  }
}

function resetList(input, cancel) {
  const listContainer = input.parentElement.parentElement;
  const list = listContainer.querySelectorAll(".list-item");
  if (list) {
    for (let i = 0; i < list.length; i++) {
      list[i].style.display = "block";
      cancel.style.display = "none";
    }
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

for (let i = 0; i < categories.length; i++) {
  const category = categories[i];
  category.addEventListener("click", () => {
    const clickedList = lists[i];
    clickedList.classList.toggle("list-box");
    if (clickedList.classList.contains("list-box")) {
      categories[i].parentElement.style.borderRadius = "11px 11px 0 0";
      category.querySelector(".chevron").src =
        "../../assets/icons/vector-up.svg";
      clickedList.style.display = "block";
    } else {
      category.style.borderRadius = "11px";
      category.querySelector(".chevron").src = "./assets/icons/Vector1.svg";
      clickedList.style.display = "none";
    }
  });
}

async function getAllIngredients() {
  const data = await getData();
  const selectedIngredients = [];

  const ingredients = data.reduce((acc, recipe) => {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i].ingredient;
      if (
        !acc.includes(ingredient) &&
        !selectedIngredients.includes(ingredient)
      ) {
        acc.push(ingredient);
        ingredientsList.innerHTML += `
          <li class="list-item">${ingredient}</li>
        `;
      }
    }
    return acc;
  }, []);

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    ingredientsList.innerHTML += `
      <li class="list-item">${ingredient}</li>
    `;
  }

  const input = document.getElementById("list-input-ingredients");
  const ingredientsListItems = document.querySelectorAll("#list-i .list-item");

  input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    for (let j = 0; j < ingredientsListItems.length; j++) {
      const listItem = ingredientsListItems[j];
      const listItemText = listItem.textContent.toLowerCase();
      if (listItemText.includes(value)) {
        listItem.style.display = "block";
      } else {
        listItem.style.display = "none";
      }
    }
  });

  for (let k = 0; k < ingredientsListItems.length; k++) {
    ingredientsListItems[k].addEventListener("click", () => {
      const selected = ingredientsListItems[k].textContent;
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
  }
  await handleInputs();
}

async function getAllAppareils() {
  const data = await getData();
  const appliances = data.reduce((acc, recipe) => {
    if (!acc.includes(recipe.appliance)) {
      acc.push(recipe.appliance);
    }
    return acc;
  }, []);
  const selectedAppareils = [];
  for (let i = 0; i < appliances.length; i++) {
    const appliance = appliances[i];
    appareilsList.innerHTML += `
    <li class="list-item">${appliance}</li>
    `;

    const input = document.getElementById("list-input-appareils");
    const appareilsListItems = document.querySelectorAll("#list-a .list-item");
    input.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      for (let j = 0; j < appareilsListItems.length; j++) {
        const listItem = appareilsListItems[j];
        const listItemText = listItem.textContent.toLowerCase();
        if (listItemText.includes(value)) {
          listItem.style.display = "block";
        } else {
          listItem.style.display = "none";
        }
      }
    });
    for (let k = 0; k < appareilsListItems.length; k++) {
      appareilsListItems[k].addEventListener("click", () => {
        const selected = appareilsListItems[k].textContent;
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
    }
  }
  await handleInputs();
}

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
  for (let i = 0; i < ustensils.length; i++) {
    const ustensil = ustensils[i];
    ustensilsList.innerHTML += `
      <li class="list-item">${ustensil}</li>
    `;
  }

  const input = document.getElementById("list-input-ustensils");
  const ustensilsListItems = document.querySelectorAll("#list-u .list-item");
  input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();
    for (let j = 0; j < ustensilsListItems.length; j++) {
      const listItem = ustensilsListItems[j];
      const listItemText = listItem.textContent.toLowerCase().trim();
      if (listItemText.includes(value)) {
        listItem.style.display = "block";
      } else {
        listItem.style.display = "none";
      }
    }
  });
  for (let k = 0; k < ustensilsListItems.length; k++) {
    ustensilsListItems[k].addEventListener("click", () => {
      const selected = ustensilsListItems[k].textContent;
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
  }
  await handleInputs();
}

getAllIngredients();
getAllAppareils();
getAllUstensils();

async function getAllSelectedOptions() {
  const selectedItemsContainer =
    selectedContainer.querySelectorAll(".selected-item");
  const selectedOptions = [];

  for (let j = 0; j < selectedItemsContainer.length; j++) {
    const item = selectedItemsContainer[j];
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
  }
  return selectedOptions;
}

async function filterMeals() {
  const allMeals = await getData();
  const selectedOptions = await getAllSelectedOptions();

  if (selectedOptions.length > 0) {
    const filteredMeals = allMeals.filter((meal) => {
      const mealIngredients = meal.ingredients.map((ingredient) =>
        ingredient.ingredient.toLowerCase()
      );
      const mealAppareils = [meal.appliance.toLowerCase()];
      const mealUstensils = meal.ustensils.map((ustensil) =>
        ustensil.toLowerCase()
      );
      return selectedOptions.every(
        (option) =>
          mealIngredients.includes(option.toLowerCase()) ||
          mealAppareils.includes(option.toLowerCase()) ||
          mealUstensils.includes(option.toLowerCase())
      );
    });

    console.log("Selected options:", selectedOptions);
    console.log("Filtered meals based on selected options:", filteredMeals);

    const mealsContainer = document.getElementById("meals-container");
    mealsContainer.innerHTML = "";

    for (let i = 0; i < filteredMeals.length; i++) {
      const meal = filteredMeals[i];
      const mealModel = mealTemplate(meal);
      const mealCardDOM = mealModel.getMealCardDOM();
      mealsContainer.appendChild(mealCardDOM);
    }
    recipeNumber.textContent = filteredMeals.length;
  } else {
    console.log("No selected options");
    init();
  }
}
