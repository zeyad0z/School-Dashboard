<template>
  <div class="flex flex-col items-center bg-[#F3F8FE] w-full min-h-screen">
    <!-- Top Bar -->
    <div class="w-full flex justify-between flex-row px-6 py-5 mb-6">
      <div class="flex gap-5">
        <button
          @click="backToLogin"
          class="flex items-center hover:bg-[#0EA5E9] p-3 rounded-md"
        >
          <div class="flex items-center gap-4">
            <UIcon
              name="i-lucide-arrow-left"
              class="w-[1rem] h-[1rem] text-gray-600"
            />
            <p class="text-[0.906rem] font-semibold text-gray-600">
              {{ $t("back_to_login") }}
            </p>
          </div>
        </button>

        <!-- Language switch -->
        <div class="flex gap-2 items-start mt-2">
          <select
            v-model="locale"
            @change="changeLanguage"
            class="text-blue-600 border border-blue-200 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-[#8FAEF3]"
          >
            <option selected value="en">EN</option>
            <option value="ar">AR</option>
          </select>
          <UIcon name="i-lucide-globe" class="mt-2 w-4 h-4 text-blue-600" />
        </div>
      </div>

      <div class="flex flex-col items-end">
        <p class="text-[0.9rem] font-base text-gray-700">
          {{ $t("welcome") }}, {{ UserStore.user.ename }}
        </p>
        <p class="text-[0.79rem] font-base text-gray-500">
          {{ $t("id") }}: {{ UserStore.user.id }}
        </p>
      </div>
    </div>

    <!-- Title & Subtitle -->
    <div
      :class="[selectedRole ? 'md:mt-0' : 'md:mt-32']"
      class="flex flex-col items-center text-center p-2 mb-8"
    >
      <div
        class="w-[5rem] h-[5rem] flex bg-[#DBEAFE] rounded-full items-center justify-center mb-3"
      >
        <UIcon
          name="i-heroicons-book-open"
          class="w-[2.85rem] h-[2.85rem] text-[#155DFC]"
        />
      </div>
      <h1 class="text-[2.4rem] font-bold text-[#1D293D] mb-2">
        {{ $t("choose_your_role") }}
      </h1>
      <p class="text-gray text-[1.3rem] max-w-xs sm:max-w-2xl">
        {{ $t("select_your_position") }}
      </p>
    </div>

    <!-- Change Roles (Mobile) -->
    <Transition name="fade">
      <div v-if="selectedRole" class="flex md:hidden">
        <button
          @click="backToRoles"
          class="bg-[#2460e2] hover:bg-[#1447E6] text-white flex items-center px-4 py-1 rounded-xl text-[1.2rem] font-semibold transition-all duration-200 cursor-pointer"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="w-[1.5rem] h-[1.5rem] me-1"
          />
          {{ $t("change_roles") }}
        </button>
      </div>
    </Transition>

    <!-- Role Cards -->
    <Transition name="fade">
      <div
        :class="[selectedRole ? 'hidden md:flex' : 'flex']"
        class="flex flex-col sm:flex-row flex-wrap gap-6 justify-center my-2 px-3"
      >
        <div v-for="role in roles" :key="role.name">
          <button
            @click="selectRole(role.name)"
            :class="[
              'flex flex-col items-center gap-1 bg-[#F8FAFC] border rounded-2xl px-36 md:px-5 py-6 w-[20rem] sm:w-[17.6rem] shadow-sm hover:shadow-md relative cursor-pointer',
              selectedRole === role.name
                ? 'border-blue-500 bg-blue-50 border-2'
                : 'border-gray-200',
              selectedRole ? 'h-[16rem]' : 'h-[14.2rem]',
            ]"
          >
            <div
              class="bg-[#DBEAFE] rounded-full w-[4rem] h-[4rem] flex items-center justify-center mb-4"
            >
              <UIcon
                :name="role.icon"
                class="w-[2rem] h-[2rem] text-[#155DFC]"
              />
            </div>

            <p class="text-xl sm:text-[1.3rem] font-semibold text-[#1D293D]">
              {{ $t(role.name) }}
            </p>
            <p class="text-sm sm:text-[0.9rem] text-gray-600 whitespace-nowrap">
              {{ $t(role.branches) }}
            </p>

            <div v-if="selectedRole === role.name" class="absolute bottom-4">
              <UIcon
                name="i-heroicons-check-circle"
                class="w-7 h-7 text-blue-600"
              />
            </div>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Branch Selection -->
    <Transition name="fade">
      <div
        v-if="selectedRole"
        class="border border-gray-200 bg-white rounded-2xl mt-5 mb-1 px-5 py-7 flex flex-col items-center w-[89%] sm:w-[90%] lg:w-[56rem] shadow-md shadow-black/20"
      >
        <h1 class="text-[1.6rem] font-semibold text-[#1D293D] mb-6">
          {{ $t("select_your_branch") }}
        </h1>
        <div
          class="flex flex-col sm:flex-row flex-wrap gap-5 justify-start w-[94%] md:w-[98%]"
        >
          <div
            v-for="branch in filteredBranches"
            :key="branch.name"
            class="w-full sm:w-auto"
          >
            <button
              @click="selectBranch(branch.name)"
              :class="[
                'flex items-center justify-between border-2 rounded-lg px-6 py-6 w-full sm:w-[16.56rem] mb-1 h-fit relative cursor-pointer hover:border-blue-300',
                selectedBranch === branch.name
                  ? 'bg-blue-50 border-blue-500 border-2'
                  : 'bg-white border-gray-200',
              ]"
            >
              <div class="flex items-center gap-3">
                <div
                  class="bg-[#EFF6FF] rounded-lg w-[3rem] h-[3rem] flex items-center justify-center"
                >
                  <UIcon
                    name="i-heroicons-building-office"
                    class="w-[2rem] h-[2rem] text-[#45556C]"
                  />
                </div>
                <div>
                  <p class="text-base font-semibold text-[#1D293D]">
                    {{ $t(branch.name) }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ $t("branch_location") }}
                  </p>
                </div>
              </div>

              <div v-if="selectedBranch === branch.name">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="w-7 h-7 text-blue-600"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Continue Button -->
    <button
      :disabled="!selectedRole || !selectedBranch"
      :class="[
        'flex items-center gap-2 px-12 py-1.5 rounded-xl mt-6 mb-8 text-[1.2rem] font-semibold transition-all duration-200',
        !selectedRole || !selectedBranch
          ? 'bg-[#83AAFD] text-white cursor-not-allowed'
          : 'bg-[#2460e2] hover:bg-[#1447E6] text-white cursor-pointer',
      ]"
      @click="continueToDashboard"
    >
      {{ $t("continue_to_dashboard") }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "~/stores/UserStore";
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();
const changeLanguage = async (event) => {
  const lang = event.target.value;
  await setLocale(lang);
  document.dir = lang === "ar" ? "rtl" : "ltr";
};
const UserStore = useUserStore();

const selectedRole = ref(null);
const selectedBranch = ref(null);

const branches = [
  { name: "main_campus" },
  { name: "north_branch" },
  { name: "south_branch" },
];

const roles = [
  {
    name: "administrator",
    branches: "administrator_branches",
    icon: "i-heroicons-academic-cap",
  },
  {
    name: "teacher",
    branches: "teacher_branches",
    icon: "i-heroicons-academic-cap",
  },
  {
    name: "student_affairs",
    branches: "student_affairs_branches",
    icon: "i-heroicons-academic-cap",
  },
];

const continueToDashboard = () => {
  UserStore.user.role = selectedRole.value;
  UserStore.user.branch = selectedBranch.value;
  navigateTo("data");
};

const filteredBranches = computed(() => {
  if (selectedRole.value === "administrator") return branches;
  if (selectedRole.value === "teacher")
    return branches.filter((b) => b.name !== "south_branch");
  if (selectedRole.value === "student_affairs")
    return branches.filter(
      (b) => b.name !== "south_branch" && b.name !== "north_branch"
    );
  return [];
});

const backToLogin = () => navigateTo("/");

function selectRole(role) {
  selectedRole.value = role;
  selectedBranch.value = null;
}

function selectBranch(branch) {
  selectedBranch.value = branch;
}

function backToRoles() {
  selectedRole.value = null;
  selectedBranch.value = null;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
