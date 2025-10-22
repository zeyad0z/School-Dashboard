<template>
  <div
    class="right relative w-full min-h-screen hidden lg:flex flex-col items-center justify-center text-white text-2xl font-bold transition-colors duration-300 bg-gradient-to-tl from-[#15a4f2] via-[#2d78f9] to-[#2B67EB] dark:from-[#1e3a8a] dark:via-[#1e40af] dark:to-[#1d4ed8]"
  >
    <!-- background pattern -->
    <div class="absolute inset-0 opacity-20 pointer-events-none bg-stars"></div>

    <!-- content -->
    <div
      class="relative z-10 flex flex-col items-center justify-center text-center px-8 py-10"
    >
      <!-- title section -->
      <div class="flex flex-col items-center">
        <div
          class="p-5 rounded-3xl bg-white/20 backdrop-blur-md dark:bg-white/10 dark:backdrop-blur-xl mb-5 border border-white/30 flex items-center justify-center shadow-lg shadow-black/20"
        >
          <UIcon
            name="i-heroicons-building-office"
            class="w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.5rem] lg:h-[3.5rem] text-white dark:text-blue-300"
          />
        </div>

        <h1 class="mb-3 font-bold text-4xl text-white dark:text-blue-100">
          {{ $t("school_name") }}
        </h1>
        <h2 class="font-medium text-xl text-blue-100 dark:text-blue-300 mb-2">
          {{ $t("school_slogan") }}
        </h2>
        <p
          class="text-center px-6 xl:px-24 text-lg font-medium text-blue-100/90 dark:text-gray-300 max-w-[46rem]"
        >
          {{ $t("school_description") }}
        </p>
      </div>

      <!-- cards section -->
      <div
        class="cards grid grid-cols-2 gap-6 p-8 mt-6 max-w-[1000px] w-full justify-center"
      >
        <UCard
          v-for="card in cards"
          :key="card.title"
          class="border border-white/30 bg-white/15 dark:bg-white/10 rounded-2xl hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 flex flex-col items-center backdrop-blur-3xl ring-0"
        >
          <UIcon
            :name="card.icon"
            class="w-10 h-10 mb-2 text-white dark:text-blue-300"
          />
          <h3 class="font-bold text-lg text-white dark:text-gray-100 mb-1">
            {{ $t(card.title) }}
          </h3>
          <p
            class="mt-2 text-center max-w-[260px] text-blue-100/80 dark:text-gray-300 text-sm font-medium"
          >
            {{ $t(card.text) }}
          </p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
const cards = [
  { title: "knowledge", text: "knowledge_text", icon: "i-lucide-book-open" },
  { title: "community", text: "community_text", icon: "i-lucide-users" },
  { title: "excellence", text: "excellence_text", icon: "i-lucide-award" },
  { title: "growth", text: "growth_text", icon: "i-lucide-target" },
];
</script>

<style scoped>
.bg-stars {
  background-image: radial-gradient(
      circle at 20% 30%,
      white 2px,
      transparent 2px
    ),
    radial-gradient(circle at 60% 70%, white 1.6px, transparent 1.6px),
    radial-gradient(circle at 80% 20%, white 2.4px, transparent 2.4px),
    radial-gradient(circle at 30% 80%, white 1.2px, transparent 1.2px),
    radial-gradient(circle at 70% 40%, white 2px, transparent 2px);
  background-size: 120px 120px, 80px 80px, 100px 100px, 150px 150px, 90px 90px;
  background-position: 0 0, 40px 40px, 20px 60px, 80px 20px, 60px 80px;
}
</style>
