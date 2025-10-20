<template>
  <NuxtLayout
    name="dashboard-default"
    class="bg-blue-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <div class="pb-3">
      <!-- Header -->
      <div
        class="flex flex-col xl:flex-row md:items-start md:justify-between mt-2"
      >
        <div class="flex flex-col text-center md:text-left">
          <p
            class="text-xs sm:text-sm text-blue-700 dark:text-blue-300 font-medium"
          >
            {{ $t("date") }}
          </p>
          <h1
            class="text-[1.5rem] sm:text-[1.7rem] md:text-[2rem] font-bold text-blue-900 dark:text-white flex items-center justify-center md:justify-start gap-2"
          >
            {{ $t("greeting") }}
            <span class="text-2xl sm:text-3xl">👋</span>
          </h1>
          <p
            class="text-blue-700 dark:text-blue-400 mt-2 sm:mt-3 text-sm sm:text-base"
          >
            {{ $t("welcome_message") }}
          </p>
        </div>

        <!-- Top cards -->
        <div
          class="flex flex-col md:flex-row xl:flex-row gap-4 md:gap-5 mt-6 md:mt-0 w-full xl:w-auto"
        >
          <div
            class="bg-[#1F6FFF] w-full text-white rounded-xl p-4 sm:p-5 md:w-75 md:h-43 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-xs sm:text-sm opacity-90">
                {{ $t("total_students") }}
              </p>
              <h2 class="text-2xl sm:text-3xl font-bold mt-1">
                {{ $t("1,247") }}
              </h2>
              <p class="text-[0.7rem] sm:text-xs opacity-80 mt-1">
                {{ $t("increase_from_last_month") }}
              </p>
            </div>
            <div
              class="bg-white/15 p-2 sm:p-3 rounded-full flex items-center justify-center"
            >
              <UIcon name="i-lucide-users" class="text-3xl sm:text-4xl" />
            </div>
          </div>

          <div
            class="bg-[#00B0E7] w-full md:w-75 md:h-43 text-white rounded-xl p-4 sm:p-5 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-xs sm:text-sm opacity-90">
                {{ $t("active_staff") }}
              </p>
              <h2 class="text-2xl sm:text-3xl font-bold mt-1">
                {{ $t("89") }}
              </h2>
              <p class="text-[0.7rem] sm:text-xs opacity-80 mt-1">
                {{ $t("all_present_today") }}
              </p>
            </div>
            <div
              class="bg-white/15 p-2 sm:p-3 rounded-full flex items-center justify-center"
            >
              <UIcon name="i-lucide-user-check" class="text-3xl sm:text-4xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-y-5 sm:gap-y-6 lg:gap-6 mt-8"
      >
        <!-- Quick Actions -->
        <div
          class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 border border-blue-100 dark:border-gray-700"
        >
          <h2
            class="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2"
          >
            <span class="text-blue-600 text-2xl sm:text-3xl">•</span>
            {{ $t("quick_actions") }}
          </h2>

          <div class="mt-6 sm:mt-10 flex flex-col gap-3">
            <button
              v-for="(action, index) in actions"
              :key="index"
              class="flex items-center gap-2 px-2 py-1 rounded-md border border-blue-200 dark:border-gray-700 text-blue-700 dark:text-blue-200 font-medium transition text-sm sm:text-base"
              :class="[
                index === 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white dark:bg-gray-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700',
              ]"
            >
              <UIcon :name="action.icon" class="w-4 h-4" />
              {{ $t(action.title) }}
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div
          class="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 border border-blue-100 dark:border-gray-700 col-span-2"
        >
          <h2
            class="text-lg sm:text-xl font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-6 sm:mb-10"
          >
            <span class="text-blue-600 text-2xl sm:text-3xl">•</span>
            {{ $t("recent_activity") }}
          </h2>

          <div class="mt-3 sm:mt-5 flex flex-col gap-3 sm:gap-4">
            <div
              v-for="(activity, i) in activities"
              :key="i"
              class="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex gap-2 bg-blue-50 dark:bg-gray-700/50"
            >
              <span
                :class="activity.dot"
                class="inline-block w-3 h-3 rounded-full mt-1 sm:mt-2"
              ></span>
              <div>
                <p
                  class="text-sm sm:text-base font-semibold text-blue-900 dark:text-white"
                >
                  {{ $t(activity.title) }}
                </p>
                <p class="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                  {{ $t(activity.desc) }}
                </p>
                <p class="text-xs text-blue-500 dark:text-blue-400">
                  {{ $t(activity.time) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification class="mb-5" />
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
    time: "2_hours_ago",
    dot: "bg-blue-600",
  },
  {
    title: "grade_submission_completed",
    desc: "desc_grade_submission",
    time: "4_hours_ago",
    dot: "bg-cyan-500",
  },
  {
    title: "system_maintenance_scheduled",
    desc: "desc_system_maintenance",
    time: "6_hours_ago",
    dot: "bg-red-500",
  },
];
</script>
