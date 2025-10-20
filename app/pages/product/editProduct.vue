<template>
  <NuxtLayout name="dashboard-edit">
    <div class="md:min-h-screen flex justify-center px-3 sm:px-4 md:px-6 mb-5">
      <div
        class="w-full max-w-4xl mt-6 md:mt-10 bg-white dark:bg-[#1e293b] rounded-2xl shadow-md p-4 sm:p-6 md:p-8 lg:p-10 h-auto md:h-[44rem] overflow-y-auto"
      >
        <form
          class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
          @submit.prevent="handleEditProduct"
        >
          <!-- Arabic Name -->
          <div>
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              {{ $t("addProduct.titleAr") }}
            </label>
            <input
              v-model="titleAr"
              class="w-full px-3 py-2 sm:py-1 border bg-white dark:bg-[#0f172a] dark:border-gray-600 rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100 dark:placeholder-gray-400"
              :placeholder="$t('addProduct.titleArPlaceholder')"
            />
          </div>

          <!-- English Name -->
          <div>
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              <span class="text-red-500">*</span> {{ $t("addProduct.titleEn") }}
            </label>
            <input
              v-model="titleEn"
              class="w-full px-3 py-2 sm:py-1 border bg-white dark:bg-[#0f172a] dark:border-gray-600 text-end rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100 dark:placeholder-gray-400"
              :placeholder="$t('addProduct.titleEnPlaceholder')"
              required
            />
          </div>

          <!-- SKU -->
          <div>
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              <span class="text-red-500">*</span> {{ $t("sku") }}
            </label>
            <input
              v-model="id"
              class="w-full px-3 py-2 sm:py-1 border bg-gray-100 dark:bg-[#0f172a] dark:border-gray-600 dark:text-gray-400 rounded-sm focus:outline-none border-gray-300 cursor-not-allowed"
              disabled
            />
          </div>

          <!-- Category -->
          <div>
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              <span class="text-red-500">*</span> {{ $t("category") }}
            </label>
            <select
              v-model="category"
              class="px-3 py-2 sm:py-1 border bg-white dark:bg-[#0f172a] dark:border-gray-600 rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100 w-full"
            >
              <option value="electronics">{{ $t("electronics") }}</option>
              <option value="jewelery">{{ $t("jewelery") }}</option>
              <option value="men's clothing">{{ $t("men's clothing") }}</option>
              <option value="women's clothing">
                {{ $t("women's clothing") }}
              </option>
            </select>
          </div>

          <!-- Price -->
          <div>
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              <span class="text-red-500">*</span>
              {{ $t("price") }} ({{ $t("sar") }})
            </label>
            <input
              v-model="price"
              class="w-full px-3 py-2 sm:py-1 border bg-white dark:bg-[#0f172a] dark:border-gray-600 rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100"
              type="number"
              step="0.01"
              :placeholder="$t('price_placeholder')"
              required
            />
          </div>

          <!-- Stock -->
          <div>
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              <span class="text-red-500">*</span> {{ $t("stock") }}
            </label>
            <input
              v-model="stock"
              class="w-full px-3 py-2 sm:py-1 border bg-white dark:bg-[#0f172a] dark:border-gray-600 rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100"
              type="number"
              step="1"
              :placeholder="$t('stock_placeholder')"
              required
            />
          </div>

          <!-- Image -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              {{ $t("image_url") }}
            </label>
            <input
              v-model="image"
              class="w-full px-3 py-2 border bg-white dark:bg-[#0f172a] dark:border-gray-600 rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100"
              type="url"
              :placeholder="$t('enter_image_url')"
            />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm font-medium dark:text-gray-200">
              {{ $t("description") }}
            </label>
            <textarea
              v-model="description"
              class="w-full px-3 py-4 sm:py-6 border bg-white dark:bg-[#0f172a] dark:border-gray-600 rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100"
              :placeholder="$t('description_placeholder')"
            />
          </div>

          <!-- Status + Buttons -->
          <div
            class="col-span-1 md:col-span-2 flex flex-nowrap items-center justify-between gap-3 sm:gap-5 mt-4"
          >
            <!-- Status -->
            <div class="w-full flex-1">
              <label class="block mb-1 text-sm font-medium dark:text-gray-200">
                {{ $t("status_label") }}
              </label>
              <select
                v-model="status"
                class="px-3 py-2 border bg-white dark:bg-[#0f172a] dark:border-gray-600 rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] dark:text-gray-100"
              >
                <option value="Active">{{ $t("active") }}</option>
                <option value="Out of Stock">{{ $t("out_of_stock") }}</option>
              </select>
            </div>

            <!-- Buttons -->
            <div
              class="flex flex-col md:flex-row gap-3 sm:gap-4 mt-4 sm:mt-5 justify-end sm:w-auto"
            >
              <button
                type="button"
                @click="cancelEdit"
                class="order-last md:order-first px-8 sm:px-10 py-2 border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition sm:w-auto"
              >
                {{ $t("cancel") }}
              </button>

              <button
                type="submit"
                class="px-8 sm:px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition sm:w-auto"
              >
                {{ $t("edit_product") }}
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
const { t } = useI18n();
const toast = useToast();
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
    router.push("/product");
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
    toast.add({
      title: t("edit_success_title"),
      description: t("edit_success_message"),
      color: "success",
    });
    router.push("/product/");
  } else {
    toast.add({
      title: t("form_error_title"),
      description: t("form_error_message"),
      color: "error",
    });
  }
}

function cancelEdit() {
  toast.add({
    title: t("edit_cancel_title"),
    description: t("edit_cancel_message"),
    color: "error",
  });
  router.push("/product/");
}
</script>
