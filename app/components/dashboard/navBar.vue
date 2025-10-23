<template>
  <header
    class="flex items-center justify-between w-full bg-white dark:bg-[#1e293b] px-3 py-2 md:px-7 md:py-4 shadow-md border-b border-gray-100 dark:border-gray-700 transition-colors duration-300"
  >
    <div class="flex gap-5 items-center">
      <!-- Sidebar toggle button-->
      <button
        class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
        @click="showSidebar.toggleSidebar()"
      >
        <UIcon name="i-lucide-menu" class="w-5 h-5" />
      </button>

      <!-- Dropdowns -->
      <select
        class="hidden md:block border border-blue-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
      >
        <option>{{ $t("school manager") }}</option>
      </select>

      <select
        class="hidden md:block border border-blue-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
      >
        <option>{{ $t("testing branch") }}</option>
      </select>

      <select
        class="hidden md:block border border-blue-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
      >
        <option>{{ $t("2025/2026") }}</option>
      </select>

      <div class="relative hidden md:block">
        <!-- Icon -->
        <UIcon
          name="i-lucide-search"
          class="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 dark:text-gray-300"
        />

        <!-- Input -->
        <input
          type="search"
          :placeholder="$t('search')"
          class="border ltr:pl-10 rtl:pr-10 ltr:pr-3 rtl:pl-3 dark:border-gray-600 dark:text-gray-100 dark:bg-gray-800 border-blue-200 rounded-md pl-10 pr-3 py-1.5 w-[16rem] bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#8FAEF3] transition"
        />
      </div>
    </div>

    <div class="flex items-center gap-2 md:gap-4">
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

      <LangSwitch />

      <!-- User Info -->
      <div
        class="flex items-center gap-2 px-2 py-1 md:px-3 md:py-2 bg-blue-50 dark:bg-gray-700 rounded-md transition"
      >
        <div class="hidden md:block text-right mr-2 ml-1">
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
import { useSideBarStore } from "../../stores/SideBarStore.js";
import DarkMode from "../UI/DarkMode.vue";
import LangSwitch from "../UI/LangSwitch.vue";

const showSidebar = useSideBarStore();
</script>
