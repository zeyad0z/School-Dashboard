<template>
  <div class="relative min-h-screen">
    <NavBar
      @toggle-sidebar="showSidebar = !showSidebar"
      class="fixed top-0 left-0 w-full z-30"
    />
    <Transition
      :name="
        document.dir === 'rtl' || $i18n.locale === 'ar'
          ? 'sidebar-slide-ar'
          : 'sidebar-slide-en'
      "
    >
      <sideBar
        v-if="showSidebar"
        :class="
          document.dir === 'rtl' || $i18n.locale === 'ar'
            ? 'fixed right-0 top-[85px] w-72 bg-white transition-transform duration-300 z-20'
            : 'fixed left-0 top-[85px] w-72 bg-white transition-transform duration-300 z-20'
        "
      />
    </Transition>
    <div
      class="py-5 pt-[100px]"
      :class="
        document.dir === 'rtl' || $i18n.locale === 'ar'
          ? 'mr-115 ml-45 '
          : 'ml-115 mr-45 '
      "
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { document } from "postcss";
import { ref } from "vue";
import NavBar from "~/components/dashboard/navBar.vue";
import sideBar from "~/components/dashboard/sideBar.vue";

const showSidebar = ref(true);
</script>

<style scoped>
.sidebar-slide-en-enter-active,
.sidebar-slide-en-leave-active {
  transition: transform 0.2s;
}
.sidebar-slide-en-enter-from {
  transform: translateX(-100%);
}
.sidebar-slide-en-enter-to {
  transform: translateX(0);
}
.sidebar-slide-en-leave-from {
  transform: translateX(0);
}
.sidebar-slide-en-leave-to {
  transform: translateX(-100%);
}

.sidebar-slide-ar-enter-active,
.sidebar-slide-ar-leave-active {
  transition: transform 0.2s;
}
.sidebar-slide-ar-enter-from {
  transform: translateX(100%);
}
.sidebar-slide-ar-enter-to {
  transform: translateX(0);
}
.sidebar-slide-ar-leave-from {
  transform: translateX(0);
}
.sidebar-slide-ar-leave-to {
  transform: translateX(100%);
}
</style>
