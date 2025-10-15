<template>
  <header
    class="flex items-center justify-between w-full bg-white px-7 py-4 shadow-md"
  >
    <div class="flex gap-5">
      <!-- Sidebar toggle button-->
      <Button class="text-blue-600" @click="showSidebar.toggleSidebar()">
        <UIcon name="i-lucide-menu" class="w-4 h-4" />
      </Button>

      <!-- Dropdowns -->
      <select
        class="border-1 border-blue-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3]"
      >
        <option>{{ $t("school manager") }}</option>
      </select>
      <select
        class="border-1 border-blue-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3]"
      >
        <option>{{ $t("testing branch") }}</option>
      </select>
      <select
        class="border-1 border-blue-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3]"
      >
        <option>{{ $t("2025/2026") }}</option>
      </select>

      <input
        type="search"
        placeholder="🔍  Search..."
        class="border-1 border-blue-200 rounded-md px-3 py-1.5 w-[16rem] bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3]"
      />
    </div>

    <div class="flex items-center gap-4">
      <!-- Notifications -->
      <div class="relative">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-lucide-bell"
          class="text-blue-600"
        />
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-[1px]"
        >
          32
        </span>
      </div>

      <!-- Language switch -->
      <div class="flex items-center gap-2">
        <select
          v-model="locale"
          @change="changeLanguage"
          class="text-blue-600 border border-blue-200 rounded-md px-2 py-1"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
        <UIcon name="i-lucide-globe" class="w-4 h-4 text-blue-600" />
      </div>

      <!-- User info -->
      <div
        class="flex items-center gap-2rounded-lg px-3 py-2 bg-blue-50 rounded-md"
      >
        <div class="text-right mr-2 ml-1">
          <p class="text-sm font-semibold">{{ $t("international manager") }}</p>
          <p class="text-xs text-blue-600">{{ $t("administrator") }}</p>
        </div>
        <div
          class="bg-gray-200 border-1 border-blue-300 rounded-full w-9 h-9"
        ></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();
import { useSideBarStore } from "../../stores/SideBarStore.js";

const showSidebar = useSideBarStore();

const changeLanguage = async (event) => {
  const lang = event.target.value;
  await setLocale(lang);
  document.dir = lang === "ar" ? "rtl" : "ltr";
};
</script>
