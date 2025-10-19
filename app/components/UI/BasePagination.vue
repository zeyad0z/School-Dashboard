<template>
  <div
    class="flex justify-center items-center gap-2 py-4 bg-blue-50 dark:bg-gray-800 rounded-b-lg transition-colors duration-300"
  >
    <!-- Prev Button -->
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="w-8 h-8 flex items-center justify-center text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-gray-600 rounded-md hover:bg-blue-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
    >
      <UIcon :name="formatPrevArrow" />
    </button>

    <!-- Page Numbers -->
    <template v-for="i in visiblePages" :key="i">
      <button
        v-if="i !== '...'"
        @click="goToPage(i)"
        class="w-8 h-8 flex items-center justify-center rounded-md border transition"
        :class="[
          i === currentPage
            ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500'
            : 'text-blue-700 dark:text-gray-200 border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white',
        ]"
      >
        {{ formatNumber(i) }}
      </button>

      <!-- Dots -->
      <span
        v-else
        class="w-8 h-8 flex items-center justify-center text-blue-400 dark:text-gray-400 select-none"
      >
        ...
      </span>
    </template>

    <!-- Next Button -->
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="w-8 h-8 flex items-center justify-center text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-gray-600 rounded-md hover:bg-blue-200 dark:hover:bg-gray-700 transition disabled:opacity-50"
    >
      <UIcon :name="formatNextArrow" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits, defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const props = defineProps({
  data: { type: Array, required: true },
  itemsPerPage: { type: Number, default: 5 },
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

watch(
  [() => props.data, currentPage],
  () => emit("update:paginatedData", paginatedData.value),
  { immediate: true }
);

// Localized numbers
const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat(
    locale.value === "ar" ? "ar-EG" : "en-US"
  );
  return formatter.format(num);
};

// Arrow icons based on direction
const formatPrevArrow = computed(() =>
  locale.value === "ar" ? "i-lucide-chevron-right" : "i-lucide-chevron-left"
);
const formatNextArrow = computed(() =>
  locale.value === "ar" ? "i-lucide-chevron-left" : "i-lucide-chevron-right"
);

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];

  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 2) pages.push(1, 2, 3, "...");
  else if (current >= total - 1) pages.push("...", total - 2, total - 1, total);
  else pages.push("...", current - 1, current, current + 1, "...");

  return pages;
});

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
