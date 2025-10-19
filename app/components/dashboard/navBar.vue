<template>
  <header
    class="flex items-center justify-between w-full bg-white dark:bg-[#1e293b] px-7 py-4 shadow-md border-b border-gray-100 dark:border-gray-700 transition-colors duration-300"
  >
    <div class="flex gap-5 items-center">
      <!-- Sidebar toggle button-->
      <Button
        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
        @click="showSidebar.toggleSidebar()"
      >
        <UIcon name="i-lucide-menu" class="w-5 h-5" />
      </Button>

      <!-- Dropdowns -->
      <select
        class="border border-blue-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
      >
        <option>{{ $t("school manager") }}</option>
      </select>

      <select
        class="border border-blue-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
      >
        <option>{{ $t("testing branch") }}</option>
      </select>

      <select
        class="border border-blue-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
      >
        <option>{{ $t("2025/2026") }}</option>
      </select>

      <!-- Search -->
      <input
        type="search"
        :placeholder="$t('search')"
        class="border dark:border-gray-600 dark:text-gray-100 dark:bg-gray-800 border-blue-200 rounded-md px-3 py-1.5 w-[16rem] bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
      />
    </div>

    <div class="flex items-center gap-4">
      <!-- Dark Mode Toggle -->
      <DarkMode />

      <!-- Notifications -->
      <div class="relative">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-lucide-bell"
          class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
        />
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-[1px]"
        >
          32
        </span>
      </div>

      <!-- Language Switch -->
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

      <!-- User Info -->
      <div
        class="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-gray-700 rounded-md transition"
      >
        <div class="text-right mr-2 ml-1">
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {{ $t("international manager") }}
          </p>
          <p class="text-xs text-blue-600 dark:text-blue-400">
            {{ $t("administrator") }}
          </p>
        </div>
        <div
          class="bg-gray-200 dark:bg-gray-800 border border-blue-300 dark:border-gray-600 rounded-full w-9 h-9 flex justify-center items-center"
        >
          <UIcon
            name="i-lucide-user"
            class="w-7 h-7 text-blue-500 dark:text-blue-400"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useSideBarStore } from "../../stores/SideBarStore.js";
import DarkMode from "../UI/DarkMode.vue";

const { locale, setLocale } = useI18n();
const showSidebar = useSideBarStore();

const changeLanguage = async (event) => {
  const lang = event.target.value;
  await setLocale(lang);
  document.dir = lang === "ar" ? "rtl" : "ltr";
};
</script>
