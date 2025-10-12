<template>
  <NuxtLayout name="dashboard-default" class="bg-blue-50">
    <div>
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm text-blue-700 font-medium">{{ $t("date") }}</p>
          <h1
            class="text-[2rem] font-bold text-blue-900 flex items-center gap-2"
          >
            {{ $t("greeting") }}
            <span class="text-3xl">👋</span>
          </h1>
          <p class="text-blue-700 mt-1">{{ $t("welcome_message") }}</p>
        </div>

        <!-- Top Stats -->
        <div class="flex gap-5 mt-6 md:mt-0">
          <div
            class="bg-[#1F6FFF] text-white rounded-xl p-5 w-75 h-42 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-sm opacity-90">{{ $t("total_students") }}</p>
              <h2 class="text-3xl font-bold mt-1">1,247</h2>
              <p class="text-xs opacity-80 mt-1">
                {{ $t("increase_from_last_month") }}
              </p>
            </div>
            <div
              class="bg-white/15 p-3 rounded-full flex items-center justify-center"
            >
              <UIcon name="i-lucide-users" class="text-4xl" />
            </div>
          </div>

          <div
            class="bg-[#00B0E7] text-white rounded-xl p-5 w-75 h-42 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-sm opacity-90">{{ $t("active_staff") }}</p>
              <h2 class="text-3xl font-bold mt-1">89</h2>
              <p class="text-xs opacity-80 mt-1">
                {{ $t("all_present_today") }}
              </p>
            </div>
            <div
              class="bg-white/15 p-3 rounded-full flex items-center justify-center"
            >
              <UIcon name="i-lucide-user-check" class="text-4xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Widgets -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        <!-- Quick Actions -->
        <div class="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
          <h2
            class="text-xl font-semibold text-blue-900 flex items-center gap-2"
          >
            <span class="text-blue-600 text-3xl">•</span>
            {{ $t("quick_actions") }}
          </h2>

          <div class="mt-10 flex flex-col gap-3">
            <button
              v-for="(action, index) in actions"
              :key="index"
              class="flex items-center gap-2 px-2 py-1 rounded-md border border-blue-200 text-blue-700 font-medium hover:bg-blue-600 hover:text-white transition"
              :class="index === 0 ? 'bg-blue-600 text-white' : 'bg-white'"
            >
              <UIcon :name="action.icon" class="w-4 h-4" />
              {{ $t(action.title) }}
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div
          class="bg-white shadow-lg rounded-xl p-6 border border-blue-100 col-span-2"
        >
          <h2
            class="text-xl font-semibold text-blue-900 flex items-center gap-2 mb-10"
          >
            <span class="text-blue-600 text-3xl">•</span>
            {{ $t("recent_activity") }}
          </h2>

          <div class="mt-5 flex flex-col gap-4">
            <div
              v-for="(activity, i) in activities"
              :key="i"
              :class="activity.bg"
              class="p-4 border border-gray-200 rounded-lg flex gap-2"
            >
              <span
                :class="activity.dot"
                class="inline-block w-3 h-3 rounded-full mr-2 mt-2"
              ></span>
              <div>
                <p class="text-sm font-semibold text-blue-900">
                  {{ $t(activity.title) }}
                </p>
                <p class="text-xs text-blue-700">
                  {{ $t(activity.desc) }}
                </p>
                <p class="text-xs text-blue-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔔 Notification Center -->
      <div
        class="mt-8 bg-white shadow-lg rounded-xl border border-blue-100 overflow-hidden"
      >
        <div
          class="flex justify-between items-center bg-blue-50 p-8 border-b border-blue-100"
        >
          <div class="flex items-center gap-3 text-blue-800 text-xl font-bold">
            <span
              class="text-white bg-blue-600 rounded-lg p-2 flex items-center justify-center"
              ><UIcon name="i-lucide-bell" class="text-xl"
            /></span>
            {{ $t("notification_center") }}
          </div>

          <div class="flex gap-2">
            <button
              class="px-4 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white shadow-sm hover:bg-blue-700"
            >
              {{ $t("all") }}
            </button>
            <button
              class="px-4 py-1.5 text-sm font-medium rounded-md border border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              {{ $t("unread") }}
            </button>
          </div>
        </div>

        <!-- Notification List -->
        <div>
          <div
            v-for="(n, index) in notifications"
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

            <div class="flex items-center gap-3">
              <button
                class="px-4 py-1.5 text-sm font-medium border border-blue-300 text-blue-700 rounded-md hover:bg-blue-600 hover:text-white transition"
              >
                {{ $t("view") }}
              </button>
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-2 py-8 bg-blue-50">
          <button
            class="w-8 h-8 flex items-center justify-center text-blue-500 border rounded-md hover:bg-blue-100 transition"
          >
            <UIcon name="i-lucide-chevron-left" />
          </button>

          <button
            v-for="i in 4"
            :key="i"
            class="w-8 h-8 flex items-center justify-center rounded-md border hover:bg-blue-600 hover:text-white transition"
            :class="
              i === 1
                ? 'bg-blue-600 text-white border-blue-600'
                : 'text-blue-600 border-blue-300'
            "
          >
            {{ i }}
          </button>

          <span class="text-blue-500">...</span>

          <button
            class="w-8 h-8 flex items-center justify-center text-blue-500 border rounded-md hover:bg-blue-100 transition"
          >
            <UIcon name="i-lucide-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const actions = [
  { title: "manage_students", icon: "i-lucide-users" },
  { title: "view_schedule", icon: "i-lucide-calendar" },
  { title: "generate_reports", icon: "i-lucide-bar-chart-2" },
  { title: "system_settings", icon: "i-lucide-settings" },
];

const activities = [
  {
    title: "new_student_enrollment",
    desc: "desc_new_student",
    time: "2 hours ago",
    bg: "bg-blue-50",
    dot: "bg-blue-600",
  },
  {
    title: "grade_submission_completed",
    desc: "desc_grade_submission",
    time: "4 hours ago",
    bg: "bg-cyan-50",
    dot: "bg-cyan-500",
  },
  {
    title: "system_maintenance_scheduled",
    desc: "desc_system_maintenance",
    time: "6 hours ago",
    bg: "bg-red-50",
    dot: "bg-red-500",
  },
];

const notifications = [
  { name: "عمر سعيد القادمي", date: "Mon, Sep 1, 2025 12:23 PM" },
  { name: "يحيى سعيد الزهراني", date: "Mon, Sep 1, 2025 12:01 PM" },
  { name: "مبارك حمدان الشهري", date: "Mon, Sep 1, 2025 11:37 AM" },
];
</script>
