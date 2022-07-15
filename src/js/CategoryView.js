// title, description => {} => saveCategory => ...
import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const productCategoryList = document.querySelector("#product-category");
const categoryWrapper = document.querySelector("#category-wrapper")
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const cancelAddCategoryBtn = document.querySelector("#cancel-add-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) => this.toggleAddCategory(e));
    cancelAddCategoryBtn.addEventListener("click", (e) => this.cancelAddCategory(e));
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;

    // check if input not be empty
    if (!title || !description) return;

    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.CreateCategoriesList();
    categoryTitle.value = "";
    categoryDescription.value = "";
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }

  CreateCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" disabled selected>Select a Category</option>`;
    this.categories.forEach((c) => {
      result += `<option class="bg-slate-500 text-slate-300" value=${c.id}>${c.title}</option>`;
    });
    productCategoryList.innerHTML = result;
  }

  toggleAddCategory(e){
    e.preventDefault()
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }

  cancelAddCategory(){
    e.preventDefault()
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }

  SetApp() {
    this.categories = Storage.getAllCategories();
  }
}

export default new CategoryView();
