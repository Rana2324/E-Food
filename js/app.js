function $(selector) {
  return document.querySelector(selector);
}

const nav = $("#nav");
const toggler = $(".toggler");
const display = $(".food_display");
const overlay = $(".overlay");
const modal = $(".modal");
const closeBtn = $(".closeBtn");

overlay.onclick = close;
closeBtn.onclick = close;

function close() {
  modal.style.display = "none";
}

toggler.onclick = function () {
  nav.classList.toggle("show");
};

window.onload = getCatagories;
let catagories;

async function getCatagories() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  const data = await response.json();
  catagories = data.categories;
  displayCategories();
}

function displayCategories() {
  display.innerHTML = "";
  catagories.forEach(function ({
    idCategory,
    strCategory,
    strCategoryDescription,
    strCategoryThumb,
  }) {
    const div = document.createElement("div");
    div.className = "category_card";
    div.innerHTML = `
    <div className="category_image">
        <img src="${strCategoryThumb}" alt="" />
      </div>
      <h3>${strCategory}</h3>
     <div class='bottom'>
     <button id="seeBtn">See Category</button>
      <button onclick="getDetails(${idCategory})">Get Details</button>
     
     </div>`;
    display.appendChild(div);
  });
}
