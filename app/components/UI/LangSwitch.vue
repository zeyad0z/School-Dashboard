<template>
  <div class="flex items-center gap-2">
    <select
      v-model="locale"
      @change="changeLanguage"
      class="text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md px-1 md:px-2 md:py-1 outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
    >
      <option value="en">EN</option>
      <option value="ar">AR</option>
    </select>
    <UIcon
      name="i-lucide-globe"
      class="md:w-5 md:h-5 text-blue-600 dark:text-blue-400"
    />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";

const { locale, setLocale } = useI18n();

onMounted(() => {
  if (typeof document === "undefined") return;
  document.dir = locale.value === "ar" ? "rtl" : "ltr";
});
const changeLanguage = async (event) => {
  const lang = event.target.value;
  await setLocale(lang);
  if (typeof document !== "undefined") {
    document.dir = lang === "ar" ? "rtl" : "ltr";
  }
};
</script>
