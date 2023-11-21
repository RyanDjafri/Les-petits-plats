import { filterMeals } from "./filters.js";

const searchBar = document.getElementById("meal");
const searchIcon = document.querySelector(".search-icon-div");
const icon = document.querySelector(".search-icon");
const originalSrc = icon.src;

searchIcon.addEventListener("mouseover", () => {
  icon.src = "../../assets/icons/search-hover.svg";
});

searchIcon.addEventListener("mouseout", () => {
  icon.src = originalSrc;
});

searchBar.addEventListener("input", async () => {
  const cancel = document.querySelector(".cancel");
  if (searchBar.value.length > 2) {
    cancel.style.display = "block";
  } else {
    cancel.style.display = "none";
  }
  if (cancel.style.display === "block") {
    cancel.addEventListener("click", () => {
      searchBar.value = "";
      cancel.style.display = "none";
      filterMeals();
    });
  }
});

