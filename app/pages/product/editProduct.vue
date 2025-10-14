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
              {{ $t("addProduct.titleAr") }}
            </label>
            <input
              v-model="titleAr"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              :placeholder="$t('addProduct.titleArPlaceholder')"
            />
          </div>

          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              {{ $t("addProduct.titleEn") }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="titleEn"
              class="w-full px-3 py-1 border bg-white rounded-sm text-end focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              :placeholder="$t('addProduct.titleEnPlaceholder')"
              required
            />
          </div>

          <!-- SKU / Category -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              {{ $t("sku") }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="id"
              class="w-full px-3 py-1 border bg-gray-100 rounded-sm focus:outline-none border-gray-300 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-end">
              {{ $t("category") }} <span class="text-red-500">*</span>
            </label>
            <select
              v-model="category"
              class="px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] w-full"
            >
              <option value="electronics">{{ $t("electronics") }}</option>
              <option value="jewelery">{{ $t("jewelry") }}</option>
              <option value="men's clothing">{{ $t("mens_clothing") }}</option>
              <option value="women's clothing">
                {{ $t("womens_clothing") }}
              </option>
            </select>
          </div>

          <!-- Price / Quantity -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              {{ $t("price") }} ({{ $t("sar") }})
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="price"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              type="number"
              step="0.1"
              :placeholder="$t('price_placeholder')"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm text-end font-medium">
              {{ $t("stock") }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="stock"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              type="number"
              :placeholder="$t('stock_placeholder')"
              required
            />
          </div>

          <!-- Image -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              {{ $t("image_url") }}
            </label>
            <input
              v-model="image"
              class="w-full px-3 py-2 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              type="url"
              :placeholder="$t('enter_image_url')"
            />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              {{ $t("description") }}
            </label>
            <textarea
              v-model="description"
              class="w-full px-3 py-6 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              :placeholder="$t('description_placeholder')"
            />
          </div>

          <!-- Status + Buttons -->
          <div
            class="md:col-span-2 flex flex-col md:flex-row items-center justify-between mt-6 gap-5"
          >
            <div class="mt-4">
              <label class="block mb-1 text-sm font-medium">{{
                $t("status_label")
              }}</label>
              <select
                v-model="status"
                class="px-3 py-2 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] w-full"
              >
                <option value="Active">{{ $t("active") }}</option>
                <option value="Out of Stock">{{ $t("out_of_stock") }}</option>
              </select>
            </div>

            <div class="flex gap-4 mt-10">
              <button
                type="button"
                @click="cancelEdit"
                class="px-10 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                {{ $t("cancel") }}
              </button>

              <button
                type="submit"
                class="px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
