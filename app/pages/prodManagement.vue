<template>
  <NuxtLayout name="dashboard-default" class="bg-blue-50">
    <div>
      <!-- header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-[2rem] font-bold text-blue-900">
            Product Management
          </h1>
          <p class="text-blue-700">
            Manage school products, inventory, and pricing
          </p>
        </div>
        <div>
          <button
            class="border border-blue-200 rounded-md px-3 py-1.5 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
            @click="$router.push('/dashboard')"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <!-- search bar and filtering -->
      <div class="bg-white rounded-md p-6 mt-7 shadow-lg flex gap-4">
        <input
          type="search"
          placeholder="🔍   Search by name, SKU..."
          class="border border-blue-200 rounded-md px-3 py-1.5 w-[57rem]"
        />
        <select
          name="filter"
          class="border border-blue-200 rounded-md px-3 py-1.5"
        >
          <option>All Categories</option>
          <option>ID</option>
          <option>Title</option>
          <option>Price</option>
          <option>Description</option>
          <option>Category</option>
        </select>
        <button
          class="text-white bg-blue-600 rounded-md px-2 py-1.5 font-semibold"
        >
          + Add Product
        </button>
      </div>

      <div class="mt-5">
        <ul>
          <li
            class="flex justify-between px-6 py-4 text-blue-900 font-semibold bg-blue-100 rounded-t-lg"
          >
            <p>SKU</p>
            <p>Product Name</p>
            <p>Category</p>
            <p>Price(SAR)</p>
            <p>Description</p>
            <p>Status</p>
            <p>Actions</p>
          </li>
          <li v-for="product in dashStore.products" :key="product.id"></li>
        </ul>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useDashStore } from "~/stores/DashStore";
const dashStore = useDashStore();
</script>
