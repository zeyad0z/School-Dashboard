<template>
  <div class="relative min-h-screen overflow-x-hidden">
    <!-- Navbar -->
    <NavBar
      @toggle-sidebar="showSidebar = !showSidebar"
      class="fixed top-0 left-0 w-full z-30"
    />

    <!-- Sidebar -->
    <Transition :name="isRTL ? 'sidebar-slide-ar' : 'sidebar-slide-en'">
      <sideBar
        v-if="showSidebar"
        :class="[
          'fixed top-[85px] w-72 bg-white z-20 transition-transform duration-300',
          isRTL ? 'right-0' : 'left-0',
        ]"
      />
    </Transition>

    <div
      class="pt-[100px] transition-all duration-300 ease-in-out max-w-[calc(100%-22rem)] mx-auto px-35"
      :style="{
        transform: showSidebar
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

const showSidebar = ref(true);
const currentDir = ref("ltr");

onMounted(() => {
  currentDir.value = document?.dir || "ltr";
});

const { locale } = useI18n();
const isRTL = computed(
  () => currentDir.value === "rtl" || locale.value === "ar"
);
</script>

<style scoped>
.sidebar-slide-en-enter-active,
.sidebar-slide-en-leave-active,
.sidebar-slide-ar-enter-active,
.sidebar-slide-ar-leave-active {
  transition: transform 0.3s ease;
}

.sidebar-slide-en-enter-from,
.sidebar-slide-en-leave-to {
  transform: translateX(-100%);
}
.sidebar-slide-ar-enter-from,
.sidebar-slide-ar-leave-to {
  transform: translateX(100%);
}
</style>
