<template>
  <button @click="toggleDark">
    <UIcon
      :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      class="text-blue-600 dark:text-blue-400 w-5 h-5 md:w-7 md:h-7"
    />
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useColorMode } from "@vueuse/core";

const isDark = ref(false);
let colorMode;

onMounted(() => {
  colorMode = useColorMode();
  isDark.value = colorMode.value === "dark";
});

const toggleDark = () => {
  if (typeof window === "undefined") return;
  if (!colorMode) colorMode = useColorMode();
  colorMode.value = isDark.value ? "light" : "dark";
  isDark.value = !isDark.value;
};
</script>
