<template>
  <aside class="w-64 h-screen bg-white flex flex-col px-6 py-6 shadow-xl">
    <!-- Logo / Title -->
    <div class="flex items-center gap-3 mb-4">
      <div class="bg-blue-500 rounded-xl flex items-center p-2.5 shadow-xl">
        <UIcon name="i-lucide-graduation-cap" class="w-7 h-7 text-white" />
      </div>
      <div>
        <h2 class="text-lg font-bold text-blue-900">{{ $t("ibn khaldun") }}</h2>
        <p class="text-sm font-medium text-blue-600">
          {{ $t("schools management") }}
        </p>
      </div>
    </div>
    <hr class="mb-8 text-gray-200" />

    <!-- Menu Items -->
    <nav class="flex flex-col gap-2">
      <button
        class="flex items-center gap-3 px-3 py-3.5 rounded-lg text-blue-700 text-sm font-medium hover:bg-blue-50 hover:shadow-sm transition"
        :class="{
          'bg-blue-600 text-white font-semibold text-lg hover:bg-blue-600':
            active === 'dashboard',
        }"
        @click="(active = 'dashboard'), $router.push('/dashboard')"
      >
        <UIcon name="i-lucide-home" class="w-4 h-4 font-bold" />
        <span>{{ $t("dashboard") }}</span>
      </button>

      <button
        class="flex items-center gap-3 px-3 py-3.5 rounded-lg text-blue-700 text-sm font-medium hover:bg-blue-50 hover:shadow-sm transition"
        :class="{
          'bg-blue-600 text-white font-semibold text-lg hover:bg-blue-600':
            active === 'products',
        }"
        @click="(active = 'products'), $router.push('/prodManagement')"
      >
        <UIcon name="i-lucide-package" class="w-4 h-4 font-bold" />
        <span>{{ $t("products management") }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const active = ref("dashboard");

// Sync active state with route
watch(
  () => route.path,
  (path) => {
    if (path === "/dashboard") active.value = "dashboard";
    else if (path === "/prodManagement") active.value = "products";
  },
  { immediate: true }
);
</script>
