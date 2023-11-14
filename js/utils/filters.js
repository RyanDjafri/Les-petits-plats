import { fetchData } from "../api/fetchData.js";

const ingredientsList = document.querySelector("#list-i");
const appareilsList = document.querySelector("#list-a");
const ustensilsList = document.querySelector("#list-u");
const recipeNumber = document.getElementById("recipes-number");
const categories = document.querySelectorAll(".category");
const lists = document.querySelectorAll(".list");
const listInputs = document.querySelectorAll("#list-input");
console.log(listInputs);

// const cancels = document.querySelectorAll(".cancel-input");

// listInputs.forEach((listInput, index) => {
//   listInput.addEventListener("input", () => {
//     const cancel = cancels[index];
//     if (listInput.value.length > 1) {
//       cancel.style.display = "block";
//     } else {
//       cancel.style.display = "none";
//     }

//     if (cancel.style.display === "block") {
//       cancel.addEventListener("click", () => {
//         listInput.value = "";
//         cancel.style.display = "none";
//       });
//     }
//   });
// });

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

categories.forEach((category, index) => {
  category.addEventListener("click", () => {
    const clickedList = lists[index];
    clickedList.classList.toggle("list-box");
    if (clickedList.classList.contains("list-box")) {
      category.querySelector(".chevron").src =
        "../../assets/icons/vector-up.svg";
      clickedList.style.display = "block";
    } else {
      category.style.borderRadius = "11px";
      category.querySelector(".chevron").src = "./assets/icons/Vector 1.svg";
      clickedList.style.display = "none";
    }
  });
});

async function getAllIngredients() {
  const data = await getData();
  const ingredients = data.reduce((acc, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!acc.includes(ingredient.ingredient)) {
        acc.push(ingredient.ingredient);
      }
    });
    return acc;
  }, []);
  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    ingredientsList.innerHTML += `
    <li class="list-item">${ingredient}</li>
    `;
  }
  // console.log(document.querySelectorAll("#list-i .list-item"));
}

async function getAllAppareils() {
  const data = await getData();
  const appliances = data.reduce((acc, recipe) => {
    if (!acc.includes(recipe.appliance)) {
      acc.push(recipe.appliance);
    }
    return acc;
  }, []);
  for (let i = 0; i < appliances.length; i++) {
    const appliance = appliances[i];
    appareilsList.innerHTML += `
    <li class="list-item">${appliance}</li>
    `;
  }
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
  for (let i = 0; i < ustensils.length; i++) {
    const ustensil = ustensils[i];
    ustensilsList.innerHTML += `
    <li class="list-item">${ustensil}</li>
    `;
  }
}

for (let i = 0; i < listInputs.length; i++) {
  listInputs[i].addEventListener("input", (event) => {
    const ingredients = listInputs[0].value.toLowerCase().split(" ");
    const appliances = listInputs[1].value.toLowerCase().split(" ");
    const ustensils = listInputs[2].value.toLowerCase().split(" ");
    // filterAndUpdateLists(ingredients, appliances, ustensils);
    console.log(event.target.value);
  });
}

// function filterAndUpdateLists(ingredients, appliances, ustensils) {
//   const ingredientsListItems = document.querySelectorAll("#list-i .list-item");

//   for (let i = 0; i < ingredientsListItems.length; i++) {
//     const itemName = ingredientsListItems[i].textContent.toLowerCase();
//     let matchesIngredients = false;

//     for (let j = 0; j < ingredients.length; j++) {
//       if (itemName.includes(ingredients[j])) {
//         matchesIngredients = true;
//         break;
//       }
//     }

//     if (matchesIngredients) {
//       ingredientsListItems[i].style.display = "block";
//     } else {
//       ingredientsListItems[i].style.display = "none";
//     }
//   }
// }

getAllIngredients();
getAllAppareils();
getAllUstensils();
