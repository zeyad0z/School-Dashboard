<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <LangSwitch class="mt-4 absolute inset ltr:left-10 rtl:right-10" />

    <DarkMode
      class="mt-5 md:mt-4.5 absolute inset ltr:left-32 md:ltr:left-36 rtl:right-32 md:rtl:right-36"
    />

    <div class="flex-[1.07] flex justify-center items-center">
      <LoginCard />
    </div>

    <div class="flex-1 hidden lg:block">
      <SideSection />
    </div>
  </div>
</template>

<script setup>
import LoginCard from "~/components/homePage/loginCard.vue";
import SideSection from "~/components/homePage/sideSection.vue";
import DarkMode from "~/components/UI/DarkMode.vue";
import LangSwitch from "~/components/UI/LangSwitch.vue";

definePageMeta({
  layout: false,
});
</script>
