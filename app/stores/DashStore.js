import { th } from "@nuxt/ui/runtime/locale/index.js";
import { defineStore } from "pinia";

export const useDashStore = defineStore("DashStore", {
  state: () => ({
    products: [],
  }),

  actions: {
    async fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      this.products = data;
    },

    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
      alert("✅ Product deleted !");
    },

    addNewProduct(newProduct) {
      // Push new product to store
      this.products.push({
        id: newProduct.id,
        title: newProduct.titleEn,
        category: newProduct.category,
        price: newProduct.price,
        stock: newProduct.stock,
        description: newProduct.description,
        status: newProduct.status,
      });
      alert("✅ Product added !");
    },
  },
});
