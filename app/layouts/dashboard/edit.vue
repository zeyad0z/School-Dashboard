<template>
  <Nav>
    <div
      class="flex items-center bg-white dark:bg-[#1e293b] shadow-md dark:shadow-gray-800 gap-4 px-6 py-3 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
    >
      <button
        class="flex justify-center items-center gap-3 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 px-3 py-1 rounded-lg transition"
        @click="$router.back()"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="w-[1rem] h-[1rem] text-blue-600 dark:text-blue-400"
        />
        <p class="font-medium text-gray-800 dark:text-gray-100">Back</p>
      </button>

      <div class="flex items-center gap-3">
        <div
          class="bg-blue-100 dark:bg-blue-900/40 flex items-center p-2 rounded-lg"
        >
          <UIcon
            name="i-lucide-package"
            class="w-[1.3rem] h-[1.3rem] text-blue-600 dark:text-blue-400"
          />
        </div>
        <div class="flex flex-col items-start">
          <h1 class="text-[1.2rem] font-bold text-gray-900 dark:text-gray-100">
            {{ $t("edit_product") }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">Edit Product</p>
        </div>
      </div>
    </div>
  </Nav>

  <div class="bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
    <slot />
  </div>
</template>

<script setup></script>
