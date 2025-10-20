<template>
  <div
    class="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-blue-100 dark:border-gray-700 overflow-hidden transition-colors duration-300"
  >
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center bg-blue-50 dark:bg-gray-900 p-4 md:p-8 border-b border-blue-100 dark:border-gray-700 transition-colors duration-300"
    >
      <div
        class="flex items-center gap-3 text-blue-800 dark:text-blue-300 text-base md:text-xl font-bold"
      >
        <span
          class="text-white bg-blue-600 dark:bg-blue-500 rounded-lg p-1 md:p-2 flex items-center justify-center"
        >
          <UIcon name="i-lucide-bell" class="w-4 h-4 md:w-5 md:h-5" />
        </span>
        {{ $t("notification_center") }}
      </div>

      <div class="flex gap-2">
        <button
          class="px-4 py-1.5 text-xs md:text-sm font-medium rounded-md bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          {{ $t("all") }}
        </button>
        <button
          class="px-4 py-1.5 text-xs md:text-sm font-medium rounded-md border border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-blue-700 dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition"
        >
          {{ $t("unread") }}
        </button>
      </div>
    </div>

    <!-- Notification List -->
    <div>
      <div
        v-for="(n, index) in paginatedNotifications"
        :key="index"
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 px-2 py-4 md:px-6 md:py-6 border-b bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 transition-colors duration-300"
      >
        <div class="flex flex-col md:flex-row items-start gap-2.5 md:gap-4">
          <span
            class="text-xs bg-blue-100 dark:bg-gray-700 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md font-medium"
          >
            {{ formatDateTime(n.date) }}
          </span>

          <div class="flex items-center gap-2.5 md:gap-4">
            <div
              class="p-1.5 md:p-2.5 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full"
            >
              <UIcon name="i-lucide-info" class="w-3.5 h-3.5 md:w-5 md:h-5" />
            </div>
            <div class="flex flex-col gap-1">
              <p
                class="text-blue-900 dark:text-gray-100 text-sm md:text-base font-semibold"
              >
                {{ $t("withdraw_request_title", { name: n.name }) }}
              </p>
              <p class="text-blue-700 dark:text-gray-300 text-xs md:text-sm">
                {{ $t("withdraw_request_desc", { name: n.name }) }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center ml-auto md:ml-0 gap-2">
          <button
            class="px-2 py-1 text-sm font-medium border border-blue-300 dark:border-gray-600 text-blue-700 dark:text-gray-200 rounded-md hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition"
          >
            {{ $t("view") }}
          </button>
          <span class="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></span>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <BasePagination
      class="py-5 md:py-7 dark:bg-gray-900"
      :data="notifications"
      :items-per-page="3"
      @update:paginatedData="paginatedNotifications = $event"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import BasePagination from "../UI/BasePagination.vue";

const { locale } = useI18n();

const notifications = ref([
  { name: "زياد عبدالعزيز الكيلاني", date: "2025-09-01T12:58:00" },
  { name: "احمد عزمي الهواري", date: "2025-09-01T12:44:00" },
  { name: "عمر سعيد القادمي", date: "2025-09-01T12:23:00" },
  { name: "يحيى سعيد الزهراني", date: "2025-09-01T12:01:00" },
  { name: "مبارك حمدان الشهري", date: "2025-09-01T11:37:00" },
  { name: "خالد بن فيصل", date: "2025-09-01T11:20:00" },
  { name: "نواف الحربي", date: "2025-09-01T10:45:00" },
  { name: "محمد الزهراني", date: "2025-09-01T09:53:00" },
  { name: "طارق محمد الجوهري", date: "2025-09-01T09:32:00" },
  { name: "محمد عبدالفتاح حسين", date: "2025-09-01T08:50:00" },
  { name: "عبدالرحمن كامل عبدالعزيز", date: "2025-09-01T08:38:00" },
  { name: "عمر سعيد القادمي", date: "2025-09-01T06:55:00" },
]);

const paginatedNotifications = ref([]);

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
</script>
