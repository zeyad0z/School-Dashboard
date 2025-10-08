<template>
  <NuxtLayout name="dashboard-prod">
    <div
      class="min-h-screen flex justify-center bg-gradient-to-b from-[#F7FAFF] to-[#EEF3FA]"
    >
      <div
        class="h-[44rem] mt-10 bg-white w-full max-w-4xl rounded-2xl shadow-md p-10 overflow-y-auto"
      >
        <form
          class="grid grid-cols-1 md:grid-cols-2 gap-5"
          @submit.prevent="handleAddProduct"
        >
          <!-- Arabic / English name -->
          <div>
            <label class="block text-end mb-1 text-sm font-medium">
              اسم المنتج بالعربية <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="titleAr"
              class="w-full"
              placeholder="أدخل اسم المنتج"
            />
          </div>

          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              اسم المنتج بالإنجليزية <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="titleEn"
              class="w-full text-end"
              placeholder="Enter product name"
            />
          </div>

          <!-- SKU / Category -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              رمز المنتج (SKU) <span class="text-red-500">*</span>
            </label>
            <UInput v-model="id" class="w-full" placeholder="PROD-001" />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-end">
              الفئة <span class="text-red-500">*</span>
            </label>
            <select
              v-model="category"
              class="border border-gray-300 rounded-md py-2 px-2 w-full"
            >
              <option value="" disabled selected hidden>اختار الفئة</option>
              <option>Electronics</option>
              <option>Jewelery</option>
              <option>Men's Clothing</option>
              <option>Women's Clothing</option>
            </select>
          </div>

          <!-- Price / Quantity -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              السعر (ريال) <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="price"
              class="w-full"
              type="number"
              step="0.1"
              placeholder="0.0"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm text-end font-medium">
              الكمية المتوفّرة <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="stock"
              class="w-full"
              type="number"
              placeholder="0"
            />
          </div>

          <!-- Image URL -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              رابط صورة المنتج <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="image"
              class="w-full"
              type="url"
              placeholder="https://example.com/product.jpg"
            />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              الوصف
            </label>
            <UTextarea
              v-model="description"
              class="w-full"
              placeholder="أدخل وصف المنتج"
            />
          </div>

          <!-- Status + Button -->
          <div class="md:col-span-2 flex items-center justify-between mt-4">
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

            <button
              type="submit"
              class="mt-20 px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              إضافة المنتج
            </button>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from "vue";
import { useDashStore } from "~/stores/DashStore.js";
import { useRouter } from "vue-router";

const dashStore = useDashStore();
const router = useRouter();

// form data
const id = ref("");
const titleAr = ref("");
const titleEn = ref("");
const category = ref("");
const price = ref(0);
const stock = ref(0);
const description = ref("");
const status = ref("Active");
const image = ref("");

// function to handle adding product
function handleAddProduct() {
  dashStore.addNewProduct({
    id: id.value,
    titleAr: titleAr.value,
    titleEn: titleEn.value,
    category: category.value,
    price: parseFloat(price.value),
    stock: parseInt(stock.value),
    description: description.value,
    status: status.value,
    image: image.value,
  });

  // clear fields
  id.value = "";
  titleAr.value = "";
  titleEn.value = "";
  category.value = "";
  price.value = 0;
  stock.value = 0;
  description.value = "";
  status.value = "Active";
  image.value = "";

  // navigate back
  router.push("/prodManagement");
}
</script>
