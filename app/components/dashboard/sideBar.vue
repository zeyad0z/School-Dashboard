<template>
  <Transition name="sidebar">
    <aside
      :key="showSidebar.isSidebarOpen"
      class="flex flex-col px-6 py-6 shadow-xl bg-white dark:bg-[#1e293b] dark:text-gray-100 transition-all duration-500  overflow-hidden border-r border-blue-100 dark:border-gray-800"
      :class="showSidebar.isSidebarOpen ? 'w-72' : 'w-20'"
    >
      <div class="flex items-center gap-3 mb-4">
        <div
          class="bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center p-2.5 shadow-xl"
        >
          <UIcon name="i-lucide-graduation-cap" class="w-7 h-7 text-white" />
        </div>

        <Transition name="fade-slide" mode="out-in">
          <div v-if="showSidebar.isSidebarOpen" key="open">
            <h2 class="text-lg font-bold text-blue-900 dark:text-blue-300">
              {{ $t("ibn khaldun") }}
            </h2>
            <p class="text-sm font-medium text-blue-600 dark:text-blue-400">
              {{ $t("schools management") }}
            </p>
          </div>
        </Transition>
      </div>

      <hr class="mb-8 border-gray-200 dark:border-gray-700" />

      <nav class="flex flex-col gap-1">
        <button
          v-for="(item, index) in sidebarItems"
          :key="index"
          class="flex items-center gap-3 ps-3 py-3.5 rounded-lg text-blue-700 dark:text-gray-200 text-sm font-medium hover:bg-blue-50 dark:hover:bg-[#1b2433] hover:shadow-sm transition"
          :class="{
            'bg-blue-600 text-white font-semibold text-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-700':
              active === item.name,
          }"
          @click="handleClick(item)"
        >
          <UIcon
            :name="item.icon"
            class="w-4 h-4 font-bold"
            :class="[showSidebar.isSidebarOpen ? '' : 'mb-1']"
          />

          <Transition name="fade-slide" mode="out-in">
            <span v-if="showSidebar.isSidebarOpen" key="label">
              {{ $t(item.label) }}
            </span>
          </Transition>
        </button>
      </nav>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSideBarStore } from "../../stores/SideBarStore.js";

const router = useRouter();
const route = useRoute();
const active = ref("dashboard");
const showSidebar = useSideBarStore();

const sidebarItems = [
  {
    name: "dashboard",
    label: "dashboard",
    icon: "i-lucide-home",
    route: "/dashboard",
  },
  {
    name: "school manager",
    label: "school manager",
    icon: "i-lucide-graduation-cap",
    route: "/dashboard",
  },
  {
    name: "administration assistant",
    label: "administration assistant",
    icon: "i-lucide-user-check",
    route: "/dashboard",
  },
  {
    name: "academic management",
    label: "academic management",
    icon: "i-lucide-book-open",
    route: "/dashboard",
  },
  {
    name: "classroom management",
    label: "classroom management",
    icon: "i-lucide-users",
    route: "/dashboard",
  },
  {
    name: "products",
    label: "products management",
    icon: "i-lucide-package",
    route: "../product",
  },
  {
    name: "behavior notes",
    label: "behavior notes",
    icon: "lucide-file-text",
    route: "/dashboard",
  },
  {
    name: "printing press",
    label: "printing press",
    icon: "i-lucide-printer",
    route: "/dashboard",
  },
  {
    name: "withdrawals",
    label: "withdrawals",
    icon: "i-lucide-users",
    route: "/dashboard",
  },
  {
    name: "student academic performance",
    label: "student academic performance",
    icon: "lucide-chart-column",
    route: "/dashboard",
  },
  {
    name: "dropout students",
    label: "dropout students",
    icon: "i-lucide-users",
    route: "/dashboard",
  },
  {
    name: "finance",
    label: "finance",
    icon: "i-lucide-credit-card",
    route: "/dashboard",
  },
  {
    name: "evaluation and measurement",
    label: "evaluation and measurement",
    icon: "i-lucide-award",
    route: "/dashboard",
  },
  {
    name: "reports",
    label: "reports",
    icon: "i-lucide-clipboard-list",
    route: "/dashboard",
  },
];

async function handleClick(item) {
  active.value = item.name;
  await router.push(item.route);
}

watch(
  () => route.path,
  (path) => {
    const cleanPath = path.replace(/\/$/, "");
    const match = sidebarItems.find((i) =>
      i.route.replace(/\/$/, "").includes(cleanPath)
    );
    if (match) active.value = match.name;
  },
  { immediate: true }
);
</script>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.4s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
