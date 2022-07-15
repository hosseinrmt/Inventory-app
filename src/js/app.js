import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.SetApp();
  ProductView.SetApp();
  CategoryView.CreateCategoriesList();
  ProductView.CreateProductsList(ProductView.products);
});
