export function mealTemplate(data) {
  const {
    id,
    image,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;
  function getMealCardDOM() {
    const article = document.createElement("article");
    const timeDiv = document.createElement("div");
    const img = document.createElement("img");
    img.alt = `image of ${name}`;
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const h4Two = document.createElement("h4");
    const ulIngredients = document.createElement("ul");
    ingredients.forEach((ingredient) => {
      const liIngredient = document.createElement("li");
      const spanQuantity = document.createElement("span");

      const ingredientText = ingredient.ingredient;
      if (ingredient.quantity !== undefined) {
        spanQuantity.textContent = `${ingredient.quantity} ${
          ingredient.unit || ""
        }`;
      }

      liIngredient.textContent = ingredientText;
      if (spanQuantity.textContent) {
        liIngredient.appendChild(spanQuantity);
      }

      ulIngredients.appendChild(liIngredient);
    });
    const spanDuration = document.createElement("span");
    spanDuration.textContent = time + "min";
    spanDuration.classList.add("time-span");
    timeDiv.appendChild(spanDuration);
    img.src = `../../data/images/${image}`;
    h3.textContent = name;
    h4.textContent = "Recette";
    h4Two.textContent = "Ingrédients";
    p.textContent = description;
    article.dataset.id = id;
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(p);
    article.appendChild(h4Two);
    article.appendChild(ulIngredients);
    timeDiv.classList.add("time-div");
    article.appendChild(timeDiv);
    return article;
  }
  return { getMealCardDOM };
}
