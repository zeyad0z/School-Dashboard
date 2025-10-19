<template>
  <button @click="toggleDark" class="">
    <UIcon
      :name="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      class="dark:text-blue-600 w-5 h-5"
    />
  </button>
</template>

<script setup>
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

const toggleDark = () => {
  colorMode.value = isDark.value ? "light" : "dark";
};
</script>
