<template>
  <Nav>
    <div class="flex items-center bg-white shadow-md gap-4 px-6 py-3">
      <button
        class="flex justify-center items-center gap-3 hover:bg-blue-400 px-3 py-1 rounded-lg"
        @click="$router.back()"
      >
        <UIcon name="i-lucide-arrow-left" class="w-[1rem] h-[1rem]" />
        <p class="font-medium">Back</p>
      </button>

      <div class="flex items-center gap-3">
        <div class="bg-blue-100 flex items-center p-2 rounded-lg">
          <UIcon
            name="i-lucide-package"
            class="w-[1.3rem] h-[1.3rem] bg-blue-600"
          />
        </div>
        <div class="flex flex-col items-start">
          <h1 class="text-[1.2rem] font-bold">{{ $t("edit_product") }}</h1>
          <p>Edit Product</p>
        </div>
      </div>
    </div>
  </Nav>
  <div>
    <slot />
  </div>
</template>

<script setup></script>
