<template>
  <NuxtLayout name="dashboard-default" class="bg-blue-50">
    <div>
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row md:items-start md:justify-between mt-2"
      >
        <div>
          <p class="text-sm text-blue-700 font-medium">{{ $t("date") }}</p>
          <h1
            class="text-[2rem] font-bold text-blue-900 flex items-center gap-2"
          >
            {{ $t("greeting") }}
            <span class="text-3xl">👋</span>
          </h1>
          <p class="text-blue-700 mt-3">{{ $t("welcome_message") }}</p>
        </div>

        <!-- Top cards -->
        <div class="flex gap-5 mt-6 md:mt-0">
          <div
            class="bg-[#1F6FFF] text-white rounded-xl p-5 w-75 h-43 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-sm opacity-90">{{ $t("total_students") }}</p>
              <h2 class="text-3xl font-bold mt-1">{{ $t("1,247") }}</h2>
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
            class="bg-[#00B0E7] text-white rounded-xl p-5 w-75 h-43 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-sm opacity-90">{{ $t("active_staff") }}</p>
              <h2 class="text-3xl font-bold mt-1">{{ $t("89") }}</h2>
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
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
      <Notification class="mb-7" />
    </div>
  </NuxtLayout>
</template>

<script setup>
import Notification from "~/components/dashboard/notification.vue";
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
</script>
