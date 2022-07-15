import Storage from "./Storage.js";
const addNewProductBtn = document.querySelector("#add-new-product");
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-quantity");
const productCategory = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const sortProducts = document.querySelector("#sort-products");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    sortProducts.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const category = productCategory.value;

    if (!title || !quantity || !category) return;

    Storage.saveProduct({ title, quantity, category });
    this.products = Storage.getAllProducts();
    this.CreateProductsList(this.products);
    productTitle.value = "";
    productQuantity.value = "";
    productCategory.value = "Select a Category";
  }

  CreateProductsList(products) {
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );

      result += `<div class="flex items-center justify-between mb-2 w-full min-w-[400px]">
      <span class="text-slate-400">${item.title}</span>
      <div class="flex items-center gap-x-3">
        <span class="text-slate-400">${new Date().toLocaleDateString(
          "fa-IR"
        )}</span>
        <span class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl">${
          selectedCategory.title
        }</span>
        <span
          class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 text-slate-300">${
            item.quantity
          }</span>
        <button class="delete-product border-2 px-2 py-o.5 rounded-xl border-red-400 text-red-400 hover:text-white hover:bg-red-400 delete-product" 
        data-product-id=${item.id}>delete</button>
      </div>
    </div>`;
    });

    document.querySelector("#product-list").innerHTML = result;

    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) =>
      item.addEventListener("click", (e) => this.deleteProduct(e))
    );
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();

    const filteredProducts = this.products.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    this.CreateProductsList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.CreateProductsList(this.products);
  }

  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.CreateProductsList(this.products);
  }

  SetApp() {
    this.products = Storage.getAllProducts();
  }
}

export default new ProductView();
