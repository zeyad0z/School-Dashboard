<template>
  <NuxtLayout name="dashboard-default" class="bg-blue-50 dark:bg-[#0d1117]">
    <div>
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-[2rem] font-bold text-blue-900 dark:text-blue-300">
            {{ $t("products management") }}
          </h1>
          <p class="text-blue-700 dark:text-gray-400">
            {{ $t("manage school products, inventory, and pricing") }}
          </p>
        </div>
        <button
          class="border border-blue-300 bg-blue-200 dark:bg-[#1e2533] dark:border-gray-600 rounded-md px-3 py-1.5 text-blue-800 dark:text-gray-200 font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-[#2563eb] transition"
          @click="$router.push('/dashboard')"
        >
          {{ $t("back to dashboard") }}
        </button>
      </div>

      <!-- Search & Filter -->
      <div
        class="bg-white dark:bg-[#1c1f26] rounded-md p-6 mt-7 shadow-lg flex gap-4"
      >
        <input
          v-model="search"
          type="search"
          :placeholder="$t('search_by_name')"
          class="border border-blue-200 dark:border-gray-600 bg-white dark:bg-[#2a2f3a] text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 w-[56rem] focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] dark:focus:ring-[#4a78e3]"
        />

        <select
          v-model="filter"
          class="border border-blue-200 dark:border-gray-600 bg-white dark:bg-[#2a2f3a] text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#8FAEF3] dark:focus:ring-[#4a78e3]"
        >
          <option value="all">{{ $t("all_categories") }}</option>
          <option value="electronics">{{ $t("electronics") }}</option>
          <option value="jewelery">{{ $t("jewelery") }}</option>
          <option value="men's clothing">{{ $t("men's clothing") }}</option>
          <option value="women's clothing">{{ $t("women's clothing") }}</option>
        </select>

        <button
          class="text-white bg-blue-600 dark:bg-blue-700 dark:hover:bg-[#1d4ed8] rounded-md px-3 py-1.5 font-semibold hover:bg-blue-700 transition"
          @click="$router.push('/Product/addProduct')"
        >
          + {{ $t("add product") }}
        </button>
      </div>

      <!-- Table -->
      <div class="mt-5">
        <table
          class="w-full text-center border-collapse table-fixed text-gray-800 dark:text-gray-200"
        >
          <thead>
            <tr
              class="bg-blue-100 dark:bg-gray-800 text-blue-900 dark:text-blue-300 font-semibold"
            >
              <th class="w-[8rem] px-6 py-4 text-start">{{ $t("sku") }}</th>
              <th class="w-[16rem]">{{ $t("product name") }}</th>
              <th class="w-[15rem]">{{ $t("category") }}</th>
              <th class="w-[10rem]">{{ $t("price") }} ({{ $t("sar") }})</th>
              <th class="w-[10rem]">{{ $t("stock") }}</th>
              <th class="w-[10rem]">{{ $t("status") }}</th>
              <th class="w-[11rem]">{{ $t("actions") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="bg-white dark:bg-[#1c1f26] border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-[#2a2f3a] transition"
            >
              <td class="px-6 py-4 text-start">{{ product.id }}</td>
              <td>{{ product.title.slice(0, 30) }}</td>
              <td>{{ $t(product.category) || product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td
                class="col-span-1"
                :class="
                  product.status === 'Out of Stock'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                "
              >
                {{
                  $t(
                    product.status === "Out of Stock"
                      ? "out_of_stock"
                      : "active"
                  )
                }}
              </td>

              <td
                class="flex justify-center items-center gap-7 py-4 col-span-1"
              >
                <!-- View -->
                <button
                  class="hover:cursor-pointer"
                  @click="openViewDialog(product)"
                  :title="$t('view')"
                >
                  <Icon
                    name="lucide:eye"
                    class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  />
                </button>

                <!-- Edit -->
                <button
                  class="hover:cursor-pointer"
                  @click="editProduct(product)"
                  :title="$t('edit')"
                >
                  <Icon
                    name="lucide:edit-3"
                    class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  />
                </button>

                <!-- Delete -->
                <button
                  class="hover:cursor-pointer"
                  @click="confirmDelete(product.id)"
                  :title="$t('delete')"
                >
                  <Icon
                    name="lucide:trash-2"
                    class="w-4 h-4 text-red-600 dark:text-red-400"
                  />
                </button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr
              class="bg-blue-100 dark:bg-gray-800 text-blue-900 dark:text-blue-300 font-semibold"
            >
              <td colspan="2" class="text-start ps-6 py-4">
                <span>
                  {{ $t("showing") }} {{ filteredProducts.length }}
                  {{ $t("of") }}
                  {{ dashStore.products.length }}
                  {{ $t("products") }}
                </span>
              </td>
              <td colspan="3">
                <Pagination
                  class="bg-blue-100 dark:bg-[#1e2533]"
                  :data="filteredProducts"
                  :itemsPerPage="5"
                  @update:paginatedData="paginatedProducts = $event"
                />
              </td>
              <td colspan="2" class="text-end pe-6 py-4">
                <span class="ml-4 flex items-center justify-end gap-1">
                  <UIcon
                    name="i-lucide-dollar-sign"
                    class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  />
                  {{ $t("total_value") }}: {{ $t("sar") }} {{ totalPrice }}
                </span>
                <span class="ml-4 flex items-center justify-end gap-1">
                  <UIcon
                    name="i-lucide-package"
                    class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  />
                  {{ $t("total_stock") }}: {{ totalStock }}
                </span>
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
