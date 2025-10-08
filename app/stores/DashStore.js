import { defineStore } from "pinia";

export const useDashStore = defineStore("DashStore", {
  state: () => ({
    products: [],
  }),

  actions: {
    // 🟦 Fetch Products from API
    async fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();

      // ✅ Add random stock + status + image
      this.products = data.map((p) => {
        const stock = Math.floor(Math.random() * 100); // 0–99
        return {
          ...p,
          stock,
          status: stock === 0 ? "Out of Stock" : "Active",
          image: p.image || "", // make sure image exists
          titleAr: "", // empty Arabic title by default
        };
      });
    },

    // 🟥 Delete product
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
      alert("✅ Product deleted!");
    },

    // 🟩 Add new product
    addNewProduct(newProduct) {
      const finalStatus =
        newProduct.stock === 0 ? "Out of Stock" : newProduct.status || "Active";

      this.products.push({
        id: newProduct.id,
        titleAr: newProduct.titleAr,
        title: newProduct.titleEn,
        category: newProduct.category,
        price: newProduct.price,
        stock: newProduct.stock,
        description: newProduct.description,
        status: finalStatus,
        image: newProduct.image || "https://via.placeholder.com/150", // ✅ fallback
      });

      alert("✅ Product added!");
    },
  },
});
