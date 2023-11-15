import { fetchData } from "../api/fetchData.js";
const searchBar = document.getElementById("meal");
const searchIcon = document.querySelector(".search-icon-div");
const icon = document.querySelector(".search-icon");
const originalSrc = icon.src;

async function getData() {
  try {
    const meals = await fetchData();
    return meals;
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return null;
  }
}

getData();

searchIcon.addEventListener("mouseover", () => {
  icon.src = "../../assets/icons/search-hover.svg";
});

searchIcon.addEventListener("mouseout", () => {
  icon.src = originalSrc;
});

searchBar.addEventListener("input", () => {
  const cancel = document.querySelector(".cancel");
  const value = searchBar.value.toLowerCase();
  if (searchBar.value.length > 1) {
    cancel.style.display = "block";
  } else {
    cancel.style.display = "none";
  }
  if (cancel.style.display === "block") {
    cancel.addEventListener("click", () => {
      searchBar.value = "";
      cancel.style.display = "none";
    });
  }
});
