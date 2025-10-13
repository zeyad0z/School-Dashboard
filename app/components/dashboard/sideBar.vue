<template>
  <aside class="w-64 bg-white flex flex-col px-6 py-6 shadow-xl">
    <div class="flex items-center gap-3 mb-4">
      <div class="bg-blue-500 rounded-xl flex items-center p-2.5 shadow-xl">
        <UIcon name="i-lucide-graduation-cap" class="w-7 h-7 text-white" />
      </div>
      <div>
        <h2 class="text-lg font-bold text-blue-900">{{ $t("ibn khaldun") }}</h2>
        <p class="text-sm font-medium text-blue-600">
          {{ $t("schools management") }}
        </p>
      </div>
    </div>
    <hr class="mb-8 text-gray-200" />

    <!-- Menu Items -->
    <nav class="flex flex-col gap-1">
      <button
        v-for="(item, index) in sidebarItems"
        :key="index"
        class="flex items-center gap-3 ps-3 py-3.5 rounded-lg text-blue-700 text-sm font-medium hover:bg-blue-50 hover:shadow-sm transition"
        :class="{
          'bg-blue-600 text-white font-semibold text-lg hover:bg-blue-600':
            active === item.name,
        }"
        @click="handleClick(item)"
      >
        <UIcon :name="item.icon" class="w-4 h-4 font-bold" />
        <span>{{ $t(item.label) }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const active = ref("dashboard");

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

// Handle click and routing
async function handleClick(item) {
  active.value = item.name;
  await router.push(item.route);
}

// Watch current route to update active highlight
watch(
  () => route.path,
  (path) => {
    const cleanPath = path.replace(/\/$/, "");
    const match = sidebarItems.find((i) =>
      i.route.replace(/\/$/, "").includes(cleanPath)
    );

    if (match) {
      active.value = match.name;
    }
  },
  { immediate: true }
);
</script>
