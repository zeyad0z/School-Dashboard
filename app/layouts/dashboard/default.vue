<template>
  <div class="relative min-h-screen">
    <NavBar @toggle-sidebar="showSidebar = !showSidebar" />
    <Transition name="sidebar-slide">
      <sideBar
        v-if="showSidebar"
        class="fixed left-0 top-[85px] w-72 bg-white transition-transform duration-300"
      />
    </Transition>
    <div class="ml-115 mr-45 py-5">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "~/components/dashboard/navBar.vue";
import sideBar from "~/components/dashboard/sideBar.vue";

const showSidebar = ref(true);
</script>

<style scoped>
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.2s;
}
.sidebar-slide-enter-from {
  transform: translateX(-100%);
}
.sidebar-slide-enter-to {
  transform: translateX(0);
}
.sidebar-slide-leave-from {
  transform: translateX(0);
}
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}
</style>
