<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-[650px] relative overflow-y-auto max-h-[80vh] mt-20"
      @click.stop
    >
      <!-- Close Button -->
      <button
        class="absolute top-3 right-4 text-gray-400 hover:text-gray-700"
        @click="$emit('close')"
      >
        <Icon name="lucide:x" class="w-5 h-5" />
      </button>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-blue-900 mb-4 text-center">
        Product Details
      </h2>

      <!-- Product Image -->
      <div class="flex justify-center mb-6">
        <img
          :src="product?.image"
          alt="Product image"
          class="w-40 h-40 object-contain rounded-lg shadow-md border border-gray-200"
        />
      </div>

      <!-- Fields Grid -->
      <div class="grid grid-cols-2 gap-5">
        <div v-for="(value, key) in fields" :key="key" class="flex flex-col">
          <label class="text-sm font-semibold text-blue-600 mb-1">
            {{ key }}
          </label>
          <div
            class="bg-blue-100 p-2 rounded-md text-gray-800 border border-gray-200"
          >
            {{ value || "—" }}
          </div>
        </div>

        <div class="flex flex-col col-span-2">
          <label class="text-sm font-semibold text-blue-600 mb-1">
            Description
          </label>
          <div
            class="bg-blue-100 p-2 rounded-md text-gray-800 border border-gray-200 min-h-[60px] max-h-40 overflow-y-auto"
          >
            {{ disc || "—" }}
          </div>
        </div>

        <div
          class="bg-blue-100 px-5 py-3 rounded-md text-gray-800 border border-gray-200 col-span-2 flex justify-between items-center"
        >
          <span class="font-bold text-blue-600">Total Inventory Value</span>
          <span class="font-bold text-blue-900 text-[1.5rem]"
            >{{ total }} SAR</span
          >
        </div>
      </div>

      <!-- Buttons -->
      <hr class="text-gray-200 mt-5 mb-3" />
      <div class="flex justify-center gap-3">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition w-full"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full"
          @click="$emit('edit', product)"
        >
          Edit Product
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: Boolean,
  product: Object,
});

const fields = computed(() => ({
  "Product Name (English)": props.product?.title || "",
  SKU: props.product?.id || "",
  Status: props.product?.status || "",
  Category: props.product?.category || "",
  Price: props.product?.price ? `${props.product.price} SAR` : "",
  "Stock Quantity": (props.product?.stock || "") + " Units",
}));

const disc = computed(() => props.product?.description || "");

const total = computed(() =>
  props.product?.price && props.product?.stock
    ? (props.product.price * props.product.stock).toFixed(2)
    : "—"
);
</script>
