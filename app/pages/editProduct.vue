<template>
  <NuxtLayout name="dashboard-edit">
    <div
      class="min-h-screen flex justify-center bg-gradient-to-b from-[#F7FAFF] to-[#EEF3FA]"
    >
      <div
        class="h-[44rem] mt-10 bg-white w-full max-w-4xl rounded-2xl shadow-md p-10 overflow-y-auto"
      >
        <form
          class="grid grid-cols-1 md:grid-cols-2 gap-5"
          @submit.prevent="handleEditProduct"
        >
          <!-- Arabic / English name -->
          <div>
            <label class="block text-end mb-1 text-sm font-medium">
              اسم المنتج بالعربية <span class="text-red-500">*</span>
            </label>
            <UInput v-model="titleAr" class="w-full" />
          </div>

          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              اسم المنتج بالإنجليزية <span class="text-red-500">*</span>
            </label>
            <UInput v-model="titleEn" class="w-full text-end" />
          </div>

          <!-- SKU / Category -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              رمز المنتج (SKU) <span class="text-red-500">*</span>
            </label>
            <UInput v-model="id" class="w-full" disabled />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-end">
              الفئة <span class="text-red-500">*</span>
            </label>
            <select
              v-model="category"
              class="border border-gray-300 rounded-md py-2 px-2 w-full"
            >
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <!-- Price / Quantity -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium"
              >السعر (ريال) <span class="text-red-500">*</span></label
            >
            <UInput v-model="price" class="w-full" type="number" step="0.1" />
          </div>

          <div>
            <label class="block mb-1 text-sm text-end font-medium"
              >الكمية <span class="text-red-500">*</span></label
            >
            <UInput v-model="stock" class="w-full" type="number" />
          </div>

          <!-- Image -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              رابط الصورة
            </label>
            <UInput v-model="image" class="w-full" type="url" />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">الوصف</label>
            <UTextarea v-model="description" class="w-full" />
          </div>

          <!-- Status + Buttons -->
          <div
            class="md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-6 gap-5"
          >
            <div>
              <label class="block mb-1 text-sm font-medium">الحالة</label>
              <select
                v-model="status"
                class="border border-gray-300 rounded-md py-2 px-2 w-full"
              >
                <option value="Active">Active</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div class="flex gap-4 mt-4 md:mt-20">
              <button
                type="button"
                @click="cancelEdit"
                class="px-10 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                إلغاء
              </button>

              <button
                type="submit"
                class="px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                تحديث المنتج
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDashStore } from "~/stores/DashStore.js";

const dashStore = useDashStore();
const router = useRouter();
const route = useRoute();

const id = ref("");
const titleAr = ref("");
const titleEn = ref("");
const category = ref("");
const price = ref(0);
const stock = ref(0);
const description = ref("");
const status = ref("Active");
const image = ref("");

onMounted(async () => {
  if (dashStore.products.length === 0) {
    await dashStore.fetchProducts();
  }

  const productId = route.query.id;
  const product = dashStore.products.find((p) => p.id.toString() === productId);

  if (product) {
    id.value = product.id;
    titleAr.value = product.titleAr || "";
    titleEn.value = product.titleEn || product.title || "";
    category.value = product.category?.toLowerCase() || "";
    price.value = product.price || 0;
    stock.value = product.stock || 0;
    description.value = product.description || "";
    status.value = product.status || "Active";
    image.value = product.image || "";
  } else {
    console.warn("Product not found, returning to management page.");
    router.push("/prodManagement");
  }
});

function handleEditProduct() {
  const updatedProduct = {
    id: id.value,
    titleAr: titleAr.value,
    titleEn: titleEn.value,
    category: category.value,
    price: parseFloat(price.value),
    stock: parseInt(stock.value),
    description: description.value,
    status: status.value,
    image: image.value,
  };

  const success = dashStore.updateProduct(updatedProduct);

  if (success !== false) {
    alert("✅ تم تحديث المنتج بنجاح!");
    router.push("/prodManagement");
  } else {
    alert("❌ حدث خطأ أثناء التحديث!");
  }
}

//زر إلغاء التعديل
function cancelEdit() {
  if (confirm("هل أنت متأكد أنك تريد إلغاء التعديل؟")) {
    router.push("/prodManagement");
  }
}
</script>
