import { fetchData } from "../api/fetchData.js";

const ingredientsList = document.querySelector("#list-i");
const appareilsList = document.querySelector("#list-a");
const ustensilsList = document.querySelector("#list-u");
const recipeNumber = document.getElementById("recipes-number");
const categories = document.querySelectorAll(".category");
const lists = document.querySelectorAll(".list");
const listInputs = document.querySelectorAll("#list-input");
const selectedContainer = document.querySelector(".selected-options");
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

  const selectedIngredients = [];

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
      } else {
        console.log(`${selected} is already selected.`);
      }
      const closeIconItem = document.querySelector(".close-icon-item");
      closeIconItem.addEventListener("click", () => {
        const item = closeIconItem.parentNode;
        console.log(item);
        item.remove();
        const index = selectedIngredients.indexOf(selected);
        selectedIngredients.splice(index, 1);
      });
    });
  }
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
  const input = document.getElementById("list-input-ustensils");
  const ustensilsListItems = document.querySelectorAll("#list-u .list-item");
  input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    for (let j = 0; j < ustensilsListItems.length; j++) {
      const listItem = ustensilsListItems[j];
      const listItemText = listItem.textContent.toLowerCase();
      if (listItemText.includes(value)) {
        listItem.style.display = "block";
      } else {
        listItem.style.display = "none";
      }
    }
  });
}

getAllIngredients();
getAllAppareils();
getAllUstensils();
