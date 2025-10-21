<template>
  <button @click="toggleDark">
    <UIcon
      :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      class="text-blue-600 dark:text-blue-400 w-5 h-5 md:w-7 md:h-7"
    />
  </button>
</template>

<script setup>
import { useColorMode } from "@vueuse/core";

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "light");

const toggleDark = () => {
  colorMode.value = isDark.value ? "dark" : "light";
};
</script>
