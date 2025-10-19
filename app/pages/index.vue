<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Language switch -->
    <div class="flex gap-2 items-start p-4">
      <select
        v-model="locale"
        @change="changeLanguage"
        class="text-blue-600 border border-blue-200 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#8FAEF3]"
      >
        <option selected value="en">EN</option>
        <option value="ar">AR</option>
      </select>
      <UIcon name="i-lucide-globe" class="mt-2 w-4 h-4 text-blue-600" />
    </div>

    <div class="flex-[1.07] flex justify-center items-center">
      <LoginCard />
    </div>

    <div class="flex-1 hidden lg:block">
      <SideSection />
    </div>
  </div>
</template>

<script setup>
import LoginCard from "~/components/homePage/loginCard.vue";
import SideSection from "~/components/homePage/sideSection.vue";
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();
const changeLanguage = async (event) => {
  const lang = event.target.value;
  await setLocale(lang);
  document.dir = lang === "ar" ? "rtl" : "ltr";
};
</script>
