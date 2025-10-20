<template>
  <div
    class="relative h-screen overflow-x-hidden bg-blue-50 text-gray-900 dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-300"
  >
    <!-- Navbar -->
    <NavBar class="fixed top-0 left-0 w-full z-30" />

    <!-- Sidebar -->
    <sideBar
      :class="[
        'fixed top-[61px] md:top-[85px] bottom-0 z-20 transition-transform duration-300 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b]',
        isRTL ? 'right-0' : 'left-0',
      ]"
    />

    <div
      class="pt-[70px] md:pt-[100px] transition-all duration-300 ease-in-out lg:max-w-[calc(100%-22rem)] mx-auto ps-2 md:ps-24 pe-2 md:px-35 h-full"
      :style="{ transform: contentTransform }"
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
const screenWidth = ref(0);

onMounted(() => {
  currentDir.value = document?.dir || "ltr";
  screenWidth.value = window.innerWidth;

  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
  });

  if (screenWidth.value < 1024) {
    showSidebar.isSidebarOpen = false;
  }
});

const { locale } = useI18n();
const isRTL = computed(
  () => currentDir.value === "rtl" || locale.value === "ar"
);

const contentTransform = computed(() => {
  if (screenWidth.value < 768) return "translateX(0)";
  if (!showSidebar.isSidebarOpen) return "translateX(4%)";
  return isRTL.value ? "translateX(-9rem)" : "translateX(9rem)";
});
</script>
