<template>
  <NuxtLayout name="dashboard-default" class="bg-blue-50">
    <div>
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-[2rem] font-bold text-blue-900">
            Product Management
          </h1>
          <p class="text-blue-700">
            Manage school products, inventory, and pricing
          </p>
        </div>
        <button
          class="border border-blue-200 rounded-md px-3 py-1.5 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
          @click="$router.push('/dashboard')"
        >
          Back to Dashboard
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="bg-white rounded-md p-6 mt-7 shadow-lg flex gap-4">
        <input
          v-model="search"
          type="search"
          placeholder="🔍 Search by name, SKU..."
          class="border border-blue-200 rounded-md px-3 py-1.5 w-[54rem]"
        />

        <select
          v-model="filter"
          class="border border-blue-200 rounded-md px-3 py-1.5"
        >
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Jewelery</option>
          <option>Men's Clothing</option>
          <option>Women's Clothing</option>
        </select>

        <button
          class="text-white bg-blue-600 rounded-md px-3 py-1.5 font-semibold hover:bg-blue-700 transition"
          @click="$router.push('/addProduct')"
        >
          + Add Product
        </button>
      </div>

      <!-- Table -->
      <div class="mt-5">
        <table class="w-full text-center border-collapse">
          <thead>
            <tr class="bg-blue-100 text-blue-900 font-semibold">
              <th class="px-6 py-4 text-start">SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price (SAR)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-white border-b border-gray-200 hover:bg-blue-50 transition"
            >
              <td class="px-6 py-4 text-start">{{ product.id }}</td>
              <td>{{ product.title.slice(0, 25) }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td
                :class="
                  product.status === 'Out of Stock'
                    ? 'text-red-600'
                    : 'text-green-600'
                "
              >
                {{ product.status }}
              </td>

              <td class="flex justify-center items-center gap-7 py-4">
                <!-- View -->
                <button
                  class="hover:cursor-pointer"
                  @click="openViewDialog(product)"
                >
                  <Icon name="lucide:eye" class="w-4 h-4 text-blue-600" />
                </button>

                <!-- Edit -->
                <button
                  class="hover:cursor-pointer"
                  @click="editProduct(product)"
                >
                  <Icon name="lucide:edit-3" class="w-4 h-4 text-blue-600" />
                </button>

                <!-- Delete -->
                <button
                  class="hover:cursor-pointer"
                  @click="confirmDelete(product.id)"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4 text-red-600" />
                </button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="bg-blue-100 text-blue-900 font-semibold">
              <td colspan="7" class="px-6 py-4">
                Showing {{ filteredProducts.length }} of
                {{ dashStore.products.length }} products
                <span class="ml-4">
                  <UIcon name="i-lucide-dollar-sign" class="w-4 h-4" /> Total
                  Value: SAR {{ totalPrice }}
                </span>
                <span class="ml-4">
                  <UIcon name="i-lucide-package" class="w-4 h-4" /> Total Stock:
                  {{ totalStock }}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Dialog Components -->
      <DeleteDialog
        :show="showDialog"
        :product="selectedProduct"
        @cancel="showDialog = false"
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
import DeleteDialog from "../components/dashboard/deleteDialog.vue";
import VeiwDialog from "../components/dashboard/veiwDialog.vue";
import { useRouter } from "vue-router";

const dashStore = useDashStore();
const router = useRouter();

onMounted(() => {
  if (dashStore.products.length === 0) {
    dashStore.fetchProducts();
  }
});

const search = ref("");
const filter = ref("All Categories");

const filteredProducts = computed(() => {
  return dashStore.products.filter((product) => {
    const matchCategory =
      filter.value === "All Categories" ||
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
    path: "/editProduct",
    query: { id: product.id.toString() },
  });
}
</script>
