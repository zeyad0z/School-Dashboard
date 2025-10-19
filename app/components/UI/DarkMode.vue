<template>
  <button @click="toggleDark">
    <UIcon
      :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      class="text-blue-600 dark:text-blue-400 w-7 h-7"
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
