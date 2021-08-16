// handle suggest list animation
const suggestListEl = document.querySelector(".suggest-list");
const inputEl = document.querySelector("input");

inputEl.addEventListener("focus", () => {
  suggestListEl.style.display = "block";
});

inputEl.addEventListener("focusout", () => {
  setTimeout(() => {
    suggestListEl.style.display = "none";
  }, 300);
});

// handle form submit
const formEl = document.querySelector("form");
const searchedList = JSON.parse(localStorage.getItem("searchedList")) || [];

formEl.addEventListener("submit", () => {
  if (!inputEl.value.trim()) {
    return;
  }
  searchedList.push(inputEl.value);
  localStorage.setItem("searchedList", JSON.stringify(searchedList));
  formEl.reset();
});

// handle search suggestion
inputEl.addEventListener("keyup", () => {
  const matchedList = searchedList.filter((el) => el.includes(inputEl.value));
  let suggestList = "";
  const highlightedList = matchedList.map((el) =>
    el.replace(inputEl.value, `<span>${inputEl.value}</span>`)
  );

  console.log(highlightedList);
  highlightedList.forEach((el) => {
    suggestList += `<li class='suggest-item'><a href='#'>${el}</a></li>`;
  });

  suggestListEl.innerHTML = suggestList;
  addEventToItem();
});

// handle suggest item click
const addEventToItem = () => {
  const suggestItemsEl = document.querySelectorAll(".suggest-item a");
  suggestItemsEl.forEach((el) => {
    el.addEventListener("click", () => {
      inputEl.value = el.outerText;
      console.log(1);
    });
  });
};
