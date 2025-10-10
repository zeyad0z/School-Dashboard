<template>
  <NuxtLayout name="dashboard-default" class="bg-blue-50">
    <div class="p-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-sm text-blue-700 font-medium">{{ $t('date') }}</p>
          <h1
            class="text-[2rem] font-bold text-blue-900 flex items-center gap-2"
          >
            {{ $t('greeting') }}
            <span class="text-3xl">👋</span>
          </h1>
          <p class="text-blue-700 mt-1">{{ $t('welcome_message') }}</p>
        </div>

        <!-- Top Stats -->
        <div class="flex gap-5 mt-6 md:mt-0">
          <div
            class="bg-[#1d4ed8] text-white rounded-xl p-5 w-52 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-sm opacity-90">{{ $t('total_students') }}</p>
              <h2 class="text-3xl font-bold mt-1">1,247</h2>
              <p class="text-xs opacity-80 mt-1">
                {{ $t('increase_from_last_month') }}
              </p>
            </div>
            <UIcon name="i-lucide-users" class="text-4xl opacity-80" />
          </div>

          <div
            class="bg-[#0ea5e9] text-white rounded-xl p-5 w-52 flex justify-between items-center shadow-md hover:shadow-2xl"
          >
            <div>
              <p class="text-sm opacity-90">{{ $t('active_staff') }}</p>
              <h2 class="text-3xl font-bold mt-1">89</h2>
              <p class="text-xs opacity-80 mt-1">
                {{ $t('all_present_today') }}
              </p>
            </div>
            <UIcon name="i-lucide-user-check" class="text-4xl opacity-80" />
          </div>
        </div>
      </div>

      <!-- Dashboard Widgets -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <!-- Quick Actions -->
        <div class="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
          <h2
            class="text-lg font-semibold text-blue-900 flex items-center gap-2"
          >
            <span class="text-blue-600">•</span> {{ $t('quick_actions') }}
          </h2>

          <div class="mt-5 flex flex-col gap-3">
            <button
              v-for="(action, index) in actions"
              :key="index"
              class="flex items-center gap-2 px-4 py-3 rounded-md border border-blue-200 text-blue-700 font-medium hover:bg-blue-600 hover:text-white transition"
              :class="index === 0 ? 'bg-blue-600 text-white' : 'bg-white'"
            >
              <UIcon :name="action.icon" class="w-5 h-5" />
              {{ $t(action.title) }}
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white shadow-lg rounded-xl p-6 border border-blue-100">
          <h2
            class="text-lg font-semibold text-blue-900 flex items-center gap-2"
          >
            <span class="text-blue-600">•</span> {{ $t('recent_activity') }}
          </h2>

          <div class="mt-5 flex flex-col gap-4">
            <div
              v-for="(activity, i) in activities"
              :key="i"
              :class="activity.bg"
              class="p-4 rounded-lg"
            >
              <p class="font-semibold text-blue-900">
                <span
                  :class="activity.dot"
                  class="inline-block w-2 h-2 rounded-full mr-2"
                ></span>
                {{ $t(activity.title) }}
              </p>
              <p class="text-sm text-blue-700 mt-1">
                {{ $t(activity.desc) }}
              </p>
              <p class="text-xs text-blue-500 mt-1">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 🔔 Notification Center -->
      <div
        class="mt-12 bg-white shadow-lg rounded-xl border border-blue-100 overflow-hidden"
      >
        <div
          class="flex justify-between items-center bg-blue-50 p-5 border-b border-blue-100"
        >
          <div
            class="flex items-center gap-2 text-blue-700 font-semibold text-lg"
          >
            <UIcon name="i-lucide-bell" class="text-xl" />
            {{ $t('notification_center') }}
          </div>

          <div class="flex gap-2">
            <button
              class="px-4 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white shadow-sm"
            >
              {{ $t('all') }}
            </button>
            <button
              class="px-4 py-1.5 text-sm font-medium rounded-md border border-blue-300 text-blue-600"
            >
              {{ $t('unread') }}
            </button>
          </div>
        </div>

        <!-- Notification List -->
        <div>
          <div
            v-for="(n, index) in notifications"
            :key="index"
            :class="index % 2 === 0 ? 'bg-blue-50' : 'bg-white'"
            class="flex justify-between items-center px-6 py-4 border-b border-blue-100"
          >
            <div class="flex items-start gap-4">
              <span
                class="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-medium"
              >
                {{ n.date }}
              </span>

              <div class="flex items-start gap-3">
                <div
                  class="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full"
                >
                  <UIcon name="i-lucide-info" />
                </div>
                <div>
                  <p class="text-blue-900 font-semibold">
                    {{ $t('withdraw_request_title', { name: n.name }) }}
                  </p>
                  <p class="text-blue-700 text-sm">
                    {{ $t('withdraw_request_desc', { name: n.name }) }}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button
                class="px-4 py-1.5 text-sm font-medium border border-blue-300 text-blue-700 rounded-md hover:bg-blue-600 hover:text-white transition"
              >
                {{ $t('view') }}
              </button>
              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-2 py-5">
          <button
            class="w-8 h-8 flex items-center justify-center text-blue-500 border rounded-md"
          >
            <UIcon name="i-lucide-chevron-left" />
          </button>

          <button
            v-for="i in 4"
            :key="i"
            class="w-8 h-8 flex items-center justify-center rounded-md border"
            :class="i === 1
              ? 'bg-blue-600 text-white border-blue-600'
              : 'text-blue-600 border-blue-300'"
          >
            {{ i }}
          </button>

          <span class="text-blue-500">...</span>

          <button
            class="w-8 h-8 flex items-center justify-center text-blue-500 border rounded-md"
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
  { title: 'manage_students', icon: 'i-lucide-user' },
  { title: 'view_schedule', icon: 'i-lucide-calendar' },
  { title: 'generate_reports', icon: 'i-lucide-bar-chart-2' },
  { title: 'system_settings', icon: 'i-lucide-settings' }
]

const activities = [
  {
    title: 'new_student_enrollment',
    desc: 'desc_new_student',
    time: '2 hours ago',
    bg: 'bg-blue-50',
    dot: 'bg-blue-600'
  },
  {
    title: 'grade_submission_completed',
    desc: 'desc_grade_submission',
    time: '4 hours ago',
    bg: 'bg-cyan-50',
    dot: 'bg-cyan-500'
  },
  {
    title: 'system_maintenance_scheduled',
    desc: 'desc_system_maintenance',
    time: '6 hours ago',
    bg: 'bg-red-50',
    dot: 'bg-red-500'
  }
]

const notifications = [
  { name: 'عمر سعيد القادمي', date: 'Mon, Sep 1, 2025 12:23 PM' },
  { name: 'يحيى سعيد الزهراني', date: 'Mon, Sep 1, 2025 12:01 PM' },
  { name: 'مبارك حمدان الشهري', date: 'Mon, Sep 1, 2025 11:37 AM' }
]
</script>
