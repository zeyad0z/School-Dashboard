<template>
  <UApp />
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
const colorMode = useColorMode();
colorMode.preference = "light";

import { useI18n } from "vue-i18n";

const { locale } = useI18n();

watch(locale, (val) => {
  document.dir = val === "ar" ? "rtl" : "ltr";
});
</script>
