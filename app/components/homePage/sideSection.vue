<template>
  <div
    class="h-full w-full bg-gradient-to-tl from-[#15a4f2] via-[#2d78f9] to-[#2B67EB] relative"
  >
    <div
      class="absolute inset-0 opacity-20 pointer-events-none"
      style="
        background-image: radial-gradient(
            circle at 20% 30%,
            white 2px,
            transparent 2px
          ),
          radial-gradient(circle at 60% 70%, white 1.6px, transparent 1.6px),
          radial-gradient(circle at 80% 20%, white 2.4px, transparent 2.4px),
          radial-gradient(circle at 30% 80%, white 1.2px, transparent 1.2px),
          radial-gradient(circle at 70% 40%, white 2px, transparent 2px);
        background-size: 120px 120px, 80px 80px, 100px 100px, 150px 150px,
          90px 90px;
        background-position: 0 0, 40px 40px, 20px 60px, 80px 20px, 60px 80px;
      "
    ></div>

    <div class="relative z-10 px-4 sm:px-6 lg:px-20 py-8 sm:py-10">
      <div class="text-center mb-10 sm:mb-12">
        <div class="flex justify-center mb-4 mt-5 sm:mt-2 xl:mt-17">
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 lg:w-[6rem] lg:h-[6rem] bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-building-office"
              class="w-12 h-12 sm:w-14 sm:h-14 lg:w-[3.5rem] lg:h-[3.5rem] text-white"
            />
          </div>
        </div>

        <h1
          class="text-2xl sm:text-3xl lg:text-[2.35rem] font-bold text-white mb-3"
        >
          {{ $t("school_name") }}
        </h1>
        <h2
          class="text-lg sm:text-xl lg:text-[1.3rem] font-semibold text-blue-100 mb-2"
        >
          {{ $t("school_slogan") }}
        </h2>
        <p
          class="text-sm sm:text-base lg:text-[1.17rem] text-blue-100/90 max-w-md sm:max-w-lg lg:max-w-lg mx-auto font-medium leading-relaxed"
        >
          {{ $t("school_description") }}
        </p>
      </div>

      <div
        class="grid grid-cols-2 md:gap-x-15 md:gap-y-6.5 max-w-lg sm:max-w-2xl lg:max-w-[40rem] mx-12 mb-6"
      >
        <UCard
          v-for="card in cards"
          :key="card.title"
          class="bg-white/15 rounded-2xl lg:w-[12.5rem] xl:w-[20.2rem] ring-1 ring-white/30 hover:bg-white/20 backdrop-blur-3xl transition-all duration-300 group"
        >
          <template #header>
            <div class="flex flex-col items-center text-center py-1">
              <div
                class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center mb-2 sm:mb-3"
              >
                <UIcon :name="card.icon" class="w-12 h-12 text-white" />
              </div>
              <h3
                class="text-base sm:text-[1.2rem] font-semibold text-white mb-1 sm:mb-2"
              >
                {{ $t(card.title) }}
              </h3>
              <p
                :class="[
                  card.title === 'knowledge' || 'comunnity' ? 'mb-2' : '',
                ]"
                class="text-blue-100/80 text-xs sm:text-[0.9rem] font-medium"
              >
                {{ $t(card.text) }}
              </p>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
const cards = [
  {
    title: "knowledge",
    text: "knowledge_text",
    icon: "i-lucide-book-open",
  },
  {
    title: "community",
    text: "community_text",
    icon: "i-heroicons-users",
  },
  {
    title: "excellence",
    text: "excellence_text",
    icon: "i-heroicons-trophy",
  },
  {
    title: "growth",
    text: "growth_text",
    icon: "clarity:target-line",
  },
];
</script>
