<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    @click="$emit('cancel')"
  >
    <div
      class="bg-white p-6 rounded-2xl shadow-xl w-[400px] text-center"
      @click.stop
    >
      <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
        <UIcon name="lucide:triangle-alert" class="w-8 h-8 text-red-600" />
        Confirm Deletion
      </h3>

      <p class="text-gray-600 mb-6">
        Are you sure you want to delete <strong>{{ product?.title }}</strong
        >?
      </p>

      <div class="flex justify-center gap-3">
        <button
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          @click="$emit('cancel')"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
          @click="$emit('confirm', product)"
        >
          <Icon name="lucide:trash-2" class="w-4 h-4 text-white" />Delete
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
