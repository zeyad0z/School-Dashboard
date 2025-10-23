<template>
  <NuxtLayout name="dashboard-default">
    <div>
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:justify-between items-center gap-4 mt-4 lg:mt-0"
      >
        <div class="text-center md:text-left">
          <h1
            class="text-[1.7rem] sm:text-[1.9rem] md:text-[2rem] font-bold text-blue-900 dark:text-blue-300"
          >
            {{ $t("products management") }}
          </h1>
          <p class="text-blue-700 dark:text-gray-400 text-sm sm:text-base">
            {{ $t("manage school products, inventory, and pricing") }}
          </p>
        </div>

        <button
          class="border border-blue-300 bg-blue-200 dark:bg-[#1e2533] dark:border-gray-600 rounded-md px-3 py-2 text-blue-800 dark:text-gray-200 font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-[#2563eb] transition w-[50%] sm:w-auto"
          @click="$router.push('/dashboard')"
        >
          {{ $t("back to dashboard") }}
        </button>
      </div>

      <!-- Search & Filter -->
      <div
        class="bg-white dark:bg-[#1c1f26] rounded-md p-4 sm:p-5 md:p-6 mt-7 shadow-lg flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4"
      >
        <div class="relative w-full sm:flex-1 md:w-[56rem]">
          <UIcon
            name="i-lucide-search"
            class="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 dark:text-gray-300 ltr:left-3 rtl:right-3"
          />
          <input
            v-model="search"
            type="search"
            :placeholder="$t('search_by_name')"
            class="border border-blue-200 dark:border-gray-600 bg-white dark:bg-[#2a2f3a] text-gray-800 dark:text-gray-200 rounded-md py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] dark:focus:ring-[#4a78e3] ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3"
          />
        </div>

        <select
          v-model="filter"
          class="border border-blue-200 dark:border-gray-600 bg-white dark:bg-[#2a2f3a] text-gray-800 dark:text-gray-200 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#8FAEF3] dark:focus:ring-[#4a78e3] w-full sm:w-auto"
        >
          <option value="all">{{ $t("all_categories") }}</option>
          <option value="electronics">{{ $t("electronics") }}</option>
          <option value="jewelery">{{ $t("jewelery") }}</option>
          <option value="men's clothing">{{ $t("men's clothing") }}</option>
          <option value="women's clothing">{{ $t("women's clothing") }}</option>
        </select>

        <button
          class="text-white bg-blue-600 dark:bg-blue-700 dark:hover:bg-[#1d4ed8] rounded-md px-3 py-2 font-semibold hover:bg-blue-700 transition w-full sm:w-auto"
          @click="$router.push('/Product/addProduct')"
        >
          + {{ $t("add product") }}
        </button>
      </div>

      <!-- Table Container with Horizontal Scroll -->
      <div class="mt-5 overflow-x-auto rounded-lg shadow-lg">
        <table
          class="min-w-full text-center border-collapse text-gray-800 dark:text-gray-200 text-xs sm:text-sm lg:text-base"
        >
          <thead>
            <tr
              class="bg-blue-100 dark:bg-gray-800 text-blue-900 dark:text-blue-300 font-semibold"
            >
              <th
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                {{ $t("sku") }}
              </th>
              <th
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                {{ $t("product name") }}
              </th>
              <th
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                {{ $t("category") }}
              </th>
              <th
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                {{ $t("price") }}
              </th>
              <th
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                {{ $t("stock") }}
              </th>
              <th
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                {{ $t("status") }}
              </th>
              <th
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                {{ $t("actions") }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="bg-white dark:bg-[#1c1f26] border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-[#2a2f3a] transition"
            >
              <td
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base"
              >
                {{ product.id }}
              </td>
              <td
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base"
              >
                <div
                  class="max-w-[120px] sm:max-w-[200px] lg:max-w-xs truncate mx-auto text-center"
                  :title="product.title"
                >
                  {{ product.title }}
                </div>
              </td>
              <td
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base"
              >
                <span class="hidden sm:inline">{{
                  $t(product.category) || product.category
                }}</span>
                <span class="sm:hidden">{{
                  product.category.slice(0, 10)
                }}</span>
              </td>
              <td
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base"
              >
                {{ product.price }}
                <span class="hidden sm:inline">{{ $t("sar") }}</span>
              </td>
              <td
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base"
              >
                {{ product.stock }}
              </td>
              <td
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base font-medium"
                :class="
                  product.status === 'Out of Stock'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                "
              >
                <span class="hidden sm:inline">
                  {{
                    $t(
                      product.status === "Out of Stock"
                        ? "out_of_stock"
                        : "active"
                    )
                  }}
                </span>
                <span class="sm:hidden">
                  {{ product.status === "Out of Stock" ? "✕" : "✓" }}
                </span>
              </td>
              <td
                class="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap"
              >
                <div
                  class="flex justify-center items-center gap-2 sm:gap-3 lg:gap-4"
                >
                  <button
                    class="hover:cursor-pointer hover:scale-110 transition"
                    @click="openViewDialog(product)"
                    :title="$t('view')"
                  >
                    <Icon
                      name="lucide:eye"
                      class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400"
                    />
                  </button>

                  <button
                    class="hover:cursor-pointer hover:scale-110 transition"
                    @click="editProduct(product)"
                    :title="$t('edit')"
                  >
                    <Icon
                      name="lucide:edit-3"
                      class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600 dark:text-blue-400"
                    />
                  </button>

                  <button
                    class="hover:cursor-pointer hover:scale-110 transition"
                    @click="confirmDelete(product.id)"
                    :title="$t('delete')"
                  >
                    <Icon
                      name="lucide:trash-2"
                      class="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-600 dark:text-red-400"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr
              class="bg-blue-100 dark:bg-gray-800 text-blue-900 dark:text-blue-300 font-semibold"
            >
              <td
                colspan="1"
                class="text-start px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 whitespace-nowrap text-xs sm:text-sm lg:text-base"
              >
                <span>
                  {{ $t("showing") }} {{ filteredProducts.length }}
                  <span class="hidden sm:inline"
                    >{{ $t("of") }} {{ dashStore.products.length }}</span
                  >
                </span>
              </td>

              <td colspan="5" class="py-2 sm:py-3 lg:py-5">
                <div class="flex justify-center">
                  <Pagination
                    :data="filteredProducts"
                    :itemsPerPage="5"
                    @update:paginatedData="paginatedProducts = $event"
                  />
                </div>
              </td>

              <td
                colspan="1"
                class="text-end px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base"
              >
                <div class="flex flex-col gap-1 sm:gap-2">
                  <span class="flex items-center justify-end gap-1">
                    <UIcon
                      name="i-lucide-dollar-sign"
                      class="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400"
                    />
                    <span class="hidden sm:inline"
                      >{{ $t("total_value") }}:</span
                    >
                    {{ totalPrice }}
                  </span>
                  <span class="flex items-center justify-end gap-1">
                    <UIcon
                      name="i-lucide-package"
                      class="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400"
                    />
                    <span class="hidden sm:inline"
                      >{{ $t("total_stock") }}:</span
                    >
                    {{ totalStock }}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Dialogs -->
      <DeleteDialog
        :show="showDialog"
        :product="selectedProduct"
        @cancel="
          (showDialog = false),
            toast.add({
              title: $t('form_cancel_title'),
              description: $t('delete_cancel_message'),
              color: 'info',
            })
        "
        @confirm="handleDelete"
      />

      <VeiwDialog
        :show="showViewDialog"
        :product="selectedProduct"
        @close="showViewDialog = false"
        @edit="editProduct"
      />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDashStore } from "~/stores/DashStore.js";
import DeleteDialog from "../../components/dashboard/deleteDialog.vue";
import VeiwDialog from "../../components/dashboard/veiwDialog.vue";
import { useRouter } from "vue-router";
import Pagination from "~/components/UI/BasePagination.vue";

const toast = useToast();
const dashStore = useDashStore();
const router = useRouter();

onMounted(() => {
  if (dashStore.products.length === 0) {
    dashStore.fetchProducts();
  }
});

const search = ref("");
const filter = ref("all");

const filteredProducts = computed(() => {
  return dashStore.products.filter((product) => {
    const matchCategory =
      filter.value === "all" ||
      product.category.toLowerCase() === filter.value.toLowerCase();

    const matchSearch = product.title
      .toLowerCase()
      .includes(search.value.toLowerCase());

    return matchCategory && matchSearch;
  });
});

const totalPrice = computed(() =>
  dashStore.products.reduce(
    (total, product) => Math.floor(total + product.price),
    0
  )
);
const totalStock = computed(() =>
  dashStore.products.reduce((total, product) => total + product.stock, 0)
);

// Delete Dialog Logic
const showDialog = ref(false);
const selectedProduct = ref(null);
const productToDelete = ref(null);

function confirmDelete(id) {
  productToDelete.value = id;
  selectedProduct.value = dashStore.products.find((p) => p.id === id);
  showDialog.value = true;
}

function handleDelete() {
  dashStore.deleteProduct(productToDelete.value);
  toast.add({
    title: $t("form_success_title"),
    description: $t("delete_success_message"),
    color: "info",
  });
  showDialog.value = false;
}

// View Product Dialog Logic
const showViewDialog = ref(false);
function openViewDialog(product) {
  selectedProduct.value = product;
  showViewDialog.value = true;
}

// Edit Logic
function editProduct(product) {
  if (!product?.id) return;
  router.push({
    path: "/product/editProduct",
    query: { id: product.id.toString() },
  });
}

const paginatedProducts = ref([]);
</script>
