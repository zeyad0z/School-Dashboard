<template>
  <div
    class="relative min-h-screen overflow-x-hidden bg-gray-50 text-gray-900 dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-300"
  >
    <!-- Navbar -->
    <NavBar class="fixed top-0 left-0 w-full z-30" />

    <!-- Sidebar -->
    <sideBar
      :class="[
        'fixed top-[85px] h-screen z-20 transition-transform duration-300 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b]',
        isRTL ? 'right-0' : 'left-0',
        showSidebar.isSidebarOpen ? 'w-72' : 'w-22',
      ]"
    />

    <div
      class="pt-[100px] transition-all duration-300 ease-in-out max-w-[calc(100%-22rem)] mx-auto px-35 h-screen"
      :style="{
        transform: showSidebar.isSidebarOpen
          ? isRTL
            ? 'translateX(-9rem)'
            : 'translateX(9rem)'
          : 'translateX(0)',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import NavBar from "~/components/dashboard/navBar.vue";
import sideBar from "~/components/dashboard/sideBar.vue";
import { useSideBarStore } from "../../stores/SideBarStore.js";

const showSidebar = useSideBarStore();
const currentDir = ref("ltr");

onMounted(() => {
  currentDir.value = document?.dir || "ltr";
});

const { locale } = useI18n();
const isRTL = computed(
  () => currentDir.value === "rtl" || locale.value === "ar"
);
</script>
