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
            {{ n.date }}
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
import BasePagination from "../UI/BasePagination.vue";

const notifications = ref([
  { name: "زياد عبدالعزيز الكيلاني", date: "Mon, Sep 1, 2025 12:58 PM" },
  { name: "احمد عزمي الهواري", date: "Mon, Sep 1, 2025 12:44 PM" },
  { name: "عمر سعيد القادمي", date: "Mon, Sep 1, 2025 12:23 PM" },
  { name: "يحيى سعيد الزهراني", date: "Mon, Sep 1, 2025 12:01 PM" },
  { name: "مبارك حمدان الشهري", date: "Mon, Sep 1, 2025 11:37 AM" },
  { name: "خالد بن فيصل", date: "Mon, Sep 1, 2025 11:20 AM" },
  { name: "نواف الحربي", date: "Mon, Sep 1, 2025 10:45 AM" },
  { name: "محمد الزهراني", date: "Mon, Sep 1, 2025 09:53 AM" },
  { name: "طارق محمد الجوهري", date: "Mon, Sep 1, 2025 09:32 AM" },
  { name: "محمد عبدالفتاح حسين", date: "Mon, Sep 1, 2025 08:50 AM" },
  { name: "عبدالرحمن كامل عبدالعزيز", date: "Mon, Sep 1, 2025 08:38 AM" },
  { name: "عمر سعيد القادمي", date: "Mon, Sep 1, 2025 06:55 AM" },
]);

const paginatedNotifications = ref([]);
</script>
