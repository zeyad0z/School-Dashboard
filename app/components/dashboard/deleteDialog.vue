<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm px-3 sm:px-0"
    @click="$emit('cancel')"
  >
    <div
      class="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-[400px] text-center border border-gray-100 dark:border-gray-700 transition-colors duration-300"
      @click.stop
    >
      <h3
        class="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center justify-center gap-2"
      >
        <UIcon
          name="lucide:triangle-alert"
          class="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-500"
        />
        {{ $t("confirm_deletion") }}
      </h3>

      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6">
        {{ $t("confirm_delete_message") }}
        <strong class="text-gray-800 dark:text-gray-100">
          {{ product?.title }}
        </strong>
        ?
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-3">
        <button
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full sm:w-auto"
          @click="$emit('cancel')"
        >
          {{ $t("cancel") }}
        </button>
        <button
          class="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition flex items-center justify-center gap-2 w-full sm:w-auto"
          @click="$emit('confirm', product)"
        >
          <Icon name="lucide:trash-2" class="w-4 h-4 text-white" />
          {{ $t("delete") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  product: Object,
});
</script>
