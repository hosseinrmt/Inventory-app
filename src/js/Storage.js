const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2022-10-31-T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2022-10-31-T15:03:00.556Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "frontend",
    createdAt: "2022-10-31-T15:04:00.889Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    descripton: "frontend of application",
    createdAt: "2021-10-31-T15:04:00.889Z",
  },
  {
    id: 2,
    title: "backend",
    descripton: "backend of application",
    createdAt: "2021-11-31-T15:04:00.889Z",
  },
];

export default class Storage {
  // get all categories
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(b.createdAt) > new Date(a.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }

  // get all products
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1;
      } else if (sort === "oldest") {
        return new Date(b.createdAt) > new Date(a.createdAt) ? -1 : 1;
      }
    });
    return sortedProducts;
  }

  // save category
  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find(
      (cat) => cat.id == categoryToSave.id
    );

    if (existedItem) {
      // edit, update category
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      // new category
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  // save product
  static saveProduct(productToSave) {
    const savedProducts = Storage.getAllProducts();
    const existedItem = savedProducts.find((p) => p.id == productToSave.id);

    if (existedItem) {
      // edit, update product
      existedItem.title = productToSave.title;
      existedItem.category = productToSave.category;
      existedItem.quantity = productToSave.quantity;
    } else {
      // new prodcut
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  // delete product
  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const newProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("products", JSON.stringify(newProducts));
  } 
}
