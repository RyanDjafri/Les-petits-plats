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
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const h4Two = document.createElement("h4");
    const ulIngredients = document.createElement("ul");
    ingredients.forEach((ingredient, quantity) => {
      const liIngredient = document.createElement("li");
      const spanIngredient = document.createElement("span");
      const spanQuantity = document.createElement("span");
      spanIngredient.textContent = ingredient;
      spanQuantity.textContent = quantity;
      liIngredient.appendChild(spanIngredient);
      liIngredient.appendChild(spanQuantity);
      ulIngredients.appendChild(liIngredient);
    });
    const spanDuration = document.createElement("span");
    spanDuration.textContent = time;
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
    article.appendChild(spanDuration);
    return article;
  }
  return { getMealCardDOM };
}
