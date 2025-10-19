<template>
  <div
    class="mt-8 bg-white shadow-lg rounded-xl border border-blue-100 overflow-hidden"
  >
    <!-- Header -->
    <div
      class="flex justify-between items-center bg-blue-50 p-8 border-b border-blue-100"
    >
      <div class="flex items-center gap-3 text-blue-800 text-xl font-bold">
        <span
          class="text-white bg-blue-600 rounded-lg p-2 flex items-center justify-center"
        >
          <UIcon name="i-lucide-bell" class="text-xl" />
        </span>
        {{ $t("notification_center") }}
      </div>

      <div class="flex gap-2">
        <button
          class="px-4 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white shadow-sm hover:bg-blue-700"
        >
          {{ $t("all") }}
        </button>
        <button
          class="px-4 py-1.5 text-sm font-medium rounded-md border border-blue-300 bg-white text-blue-700 hover:bg-blue-600 hover:text-white transition"
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
        class="flex justify-between items-center px-6 py-6 border-b bg-white border-blue-100"
      >
        <div class="flex items-start gap-4">
          <span
            class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium"
          >
            {{ formatDateTime(n.date) }}
          </span>

          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full"
            >
              <UIcon name="i-lucide-info" />
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-blue-900 font-semibold">
                {{ $t("withdraw_request_title", { name: n.name }) }}
              </p>
              <p class="text-blue-700 text-sm">
                {{ $t("withdraw_request_desc", { name: n.name }) }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="px-2 py-1 text-sm font-medium border border-blue-300 text-blue-700 rounded-md hover:bg-blue-600 hover:text-white transition"
          >
            {{ $t("view") }}
          </button>
          <span class="w-3 h-3 bg-blue-500 rounded-full"></span>
        </div>
      </div>
    </div>

    <BasePagination
      class="py-8"
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
