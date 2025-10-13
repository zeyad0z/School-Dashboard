<template>
  <div
    class="flex justify-center items-center gap-2 py-4 bg-blue-50 rounded-b-lg"
  >
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="w-8 h-8 flex items-center justify-center text-blue-700 border rounded-md hover:bg-blue-200 transition disabled:opacity-50"
    >
      <UIcon name="i-lucide-chevron-left" />
    </button>

    <button
      v-for="i in totalPages"
      :key="i"
      @click="goToPage(i)"
      class="w-8 h-8 flex items-center justify-center rounded-md border transition"
      :class="[
        i === currentPage
          ? 'bg-blue-600 text-white border-blue-600'
          : 'text-blue-700 border-blue-300 bg-white hover:bg-blue-600 hover:text-white',
      ]"
    >
      {{ i }}
    </button>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="w-8 h-8 flex items-center justify-center text-blue-700 border rounded-md hover:bg-blue-200 transition disabled:opacity-50"
    >
      <UIcon name="i-lucide-chevron-right" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps } from "vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:paginatedData"]);

const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(props.data.length / props.itemsPerPage)
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  return props.data.slice(start, start + props.itemsPerPage);
});

// Emit updated page data
watch(
  [() => props.data, currentPage],
  () => emit("update:paginatedData", paginatedData.value),
  { immediate: true }
);

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>
