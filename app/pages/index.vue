<script setup lang="ts">
import LoginCard from "~/components/homePage/loginCard.vue";
import SideSection from "~/components/homePage/sideSection.vue";
</script>

<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <div class="flex-[1.07] flex justify-center items-center">
      <LoginCard />
    </div>

    <div class="flex-1 hidden lg:block">
      <SideSection />
    </div>
  </div>
</template>
