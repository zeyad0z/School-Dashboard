<template>
  <div
    class="flex w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <!-- Language switch -->
    <div class="flex gap-2 items-start p-4">
      <select
        v-model="locale"
        @change="changeLanguage"
        class="text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#8FAEF3]"
      >
        <option selected value="en">EN</option>
        <option value="ar">AR</option>
      </select>
      <UIcon
        name="i-lucide-globe"
        class="mt-2 w-4 h-4 text-blue-600 dark:text-blue-300"
      />
    </div>

    <div class="flex-[1.07] flex justify-center items-center">
      <BaseCard class="mx-7 dark:bg-gray-800 transition-colors duration-300">
        <div class="flex justify-center mb-5">
          <div
            class="bg-green-100 dark:bg-green-900/40 p-3 rounded-full flex items-center justify-center"
          >
            <UIcon name="i-heroicons-check" class="w-9 h-9 text-[#00A63E]" />
          </div>
        </div>

        <h2
          class="text-[1.6rem] font-bold text-center mb-1 text-black dark:text-white"
        >
          {{ $t("welcome_back") }}
        </h2>
        <p
          class="text-gray-400 dark:text-gray-300 font-medium text-center mb-12 text-sm"
        >
          {{ $t("ready_to_continue_learning") }}
        </p>

        <div
          class="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-6 text-gray-600 dark:text-gray-200"
        >
          <div
            class="bg-[#DCE6F7] dark:bg-blue-900/40 border-2 border-[#B7CCF4] dark:border-blue-800 w-[3rem] h-[3rem] rounded-full flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-user"
              class="w-[1.8rem] h-[1.7rem] text-[#2563EB]"
            />
          </div>

          <div class="flex flex-col">
            <span class="text-lg font-semibold text-gray-800 dark:text-white">
              {{ UserStore.user?.ename }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ $t("id") }}: {{ UserStore.user?.id }}
            </span>
          </div>
        </div>

        <div
          class="bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-6 text-gray-600 dark:text-gray-200 space-y-2"
        >
          <div class="flex items-center">
            <UIcon
              name="i-heroicons-book-open"
              class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
            />
            <span class="text-gray-500 dark:text-gray-300 text-[0.93rem]"
              >{{ $t("position") }}:</span
            >
            <div
              class="ml-2 text-[#2563EB] dark:text-blue-300 text-xs font-semibold bg-[#DCE6F7] dark:bg-blue-900/40 rounded-md px-2 py-0.5"
            >
              {{ $t(UserStore.user?.role) }}
            </div>
          </div>

          <div class="flex items-center">
            <UIcon
              name="i-heroicons-building-office"
              class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
            />
            <span class="text-gray-500 dark:text-gray-300 text-[0.93rem]"
              >{{ $t("branch") }}:</span
            >
            <span
              class="ml-2 text-[#2563EB] dark:text-blue-300 text-xs font-semibold bg-[#F1F5F9] dark:bg-blue-900/40 border-2 border-[#DCE6F7] dark:border-blue-800 rounded-md px-2 py-0.5"
            >
              {{ $t(UserStore.user?.branch) }}
            </span>
          </div>
        </div>

        <button
          @click="goDashboard"
          class="mb-6 w-full py-3 rounded-md font-medium cursor-pointer transition-all duration-300 bg-[#1d58d6] text-[0.92rem] text-white hover:bg-[#386ad7]"
        >
          {{ $t("enter_dashboard") }}
        </button>
      </BaseCard>
    </div>

    <div class="flex-1 hidden lg:block">
      <HomePageSideSection />
    </div>
  </div>
</template>

<script setup>
import BaseCard from "../../components/UI/BaseCard.vue";
import { useUserStore } from "~/stores/UserStore";
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();
const changeLanguage = async (event) => {
  const lang = event.target.value;
  await setLocale(lang);
  document.dir = lang === "ar" ? "rtl" : "ltr";
};
const UserStore = useUserStore();

const goDashboard = () => {
  navigateTo("../../dashboard");
};
</script>
