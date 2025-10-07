import { defineStore } from "pinia";

export const useDashStore = defineStore("DashStore", {
  state: () => ({
    products: [], // كل المنتجات
    loading: false, // حالة التحميل
    error: null, // لتخزين الأخطاء إن وجدت
  }),

  actions: {
    // 🟢 جلب كل المنتجات من API
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await useFetch(
          "https://fakestoreapi.com/products"
        );
        if (error.value) throw error.value;

        // نخزن فقط الحقول اللي انت محتاجها
        this.products = (data.value || []).map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
        }));
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    // 🟡 إضافة منتج جديد (محلي فقط)
    addProduct(newProduct) {
      const product = {
        id: Date.now(),
        title: newProduct.title,
        price: newProduct.price,
        description: newProduct.description,
        category: newProduct.category,
        image: newProduct.image,
      };
      this.products.push(product);
    },

    // 🟠 تحديث منتج موجود
    updateProduct(updatedProduct) {
      const index = this.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          ...updatedProduct,
        };
      }
    },

    // 🔴 حذف منتج
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
});
