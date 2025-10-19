<template>
  <div class="flex items-center gap-2">
    <select
      v-model="locale"
      @change="changeLanguage"
      class="text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
    >
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
    <UIcon
      name="i-lucide-globe"
      class="w-4 h-4 text-blue-600 dark:text-blue-400"
    />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();
const changeLanguage = async (event) => {
  const lang = event.target.value;
  await setLocale(lang);
  document.dir = lang === "ar" ? "rtl" : "ltr";
};
</script>
