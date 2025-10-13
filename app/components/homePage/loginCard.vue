<template>
  <div
    class="min-h-fit w-full flex justify-center items-center px-4 sm:px-6 lg:px-8"
  >
    <BaseCard class="mx-5">
      <div class="mb-8 pb-4 text-center">
        <h1 class="text-2xl text-black/85 sm:text-[1.95rem] font-bold mb-3">
          {{ $t("welcome") }}
        </h1>
        <p class="text-gray-500 text-sm sm:text-[1.02rem] mt-3">
          Access your educational dashboard
        </p>
      </div>

      <form @submit.prevent="logIn" class="mt-4 sm:mt-6">
        <label for="id" class="text-sm font-medium">Staff/Student ID</label>
        <input
          type="text"
          name="id"
          :placeholder="
            v$.id.$error && v$.id.$dirty ? 'ID is required' : 'Enter your ID'
          "
          v-model="state.id"
          @blur="v$.id.$touch()"
          :class="[
            'w-full px-3 sm:px-4 py-2 sm:py-3 mb-2 mt-1 border bg-white rounded-lg focus:outline-none',
            v$.id.$error && v$.id.$dirty
              ? 'border-2 border-red-400 placeholder-red-400'
              : 'border-gray-200 focus:ring-2 focus:ring-[#8FAEF3]',
          ]"
        />

        <label for="ename" class="text-sm font-medium">Name in English</label>
        <input
          type="text"
          name="ename"
          :placeholder="
            v$.ename.$error && v$.ename.$dirty
              ? 'Name is required'
              : 'Enter your Name'
          "
          v-model.trim="state.ename"
          @input="v$.ename.$touch()"
          @blur="v$.ename.$touch()"
          :class="[
            'w-full px-3 sm:px-4 py-2 sm:py-3 mb-2 mt-1 border bg-white rounded-lg focus:outline-none',
            v$.ename.$error && v$.ename.$dirty
              ? 'border-2 border-red-400 placeholder-red-400'
              : 'border-gray-200 focus:ring-2 focus:ring-[#8FAEF3]',
          ]"
        />
        <p
          v-if="!v$.ename.required.$invalid && v$.ename.englishOnly.$invalid"
          class="text-red-500 text-sm mb-2"
        >
          {{ v$.ename.englishOnly.$message }}
        </p>

        <label for="aname" class="text-sm font-medium"
          >الأسم باللغة العربية</label
        >
        <input
          type="text"
          name="aname"
          :placeholder="
            v$.aname.$error && v$.aname.$dirty ? 'الأسم مطلوب' : 'ادخل الأسم'
          "
          v-model.trim="state.aname"
          @input="v$.aname.$touch()"
          @blur="v$.aname.$touch()"
          :class="[
            'w-full px-3 sm:px-4 py-2 sm:py-3 mb-2 mt-1 border bg-white rounded-lg focus:outline-none',
            v$.aname.$error && v$.aname.$dirty
              ? 'border-2 border-red-400 placeholder-red-400'
              : 'border-gray-200 focus:ring-2 focus:ring-[#8FAEF3]',
          ]"
        />
        <p
          v-if="!v$.aname.required.$invalid && v$.aname.arabicOnly.$invalid"
          class="text-red-500 text-sm mb-2"
        >
          {{ v$.aname.arabicOnly.$message }}
        </p>

        <label for="pass" class="text-sm font-medium">Password</label>
        <input
          type="password"
          name="pass"
          :placeholder="
            v$.pass.$error && v$.pass.$dirty
              ? 'Password is required'
              : 'Enter your Password'
          "
          v-model="state.pass"
          @input="v$.pass.$touch()"
          @blur="v$.pass.$touch()"
          :class="[
            'w-full px-3 sm:px-4 py-2 sm:py-3 mb-2 mt-1 border bg-white rounded-lg focus:outline-none ',
            v$.pass.$error && v$.pass.$dirty
              ? 'border-2 border-red-400 placeholder-red-400 '
              : 'border-gray-200 focus:ring-2 focus:ring-[#8FAEF3]',
          ]"
        />
        <p
          v-if="v$.pass.$error && v$.pass.minLength.$invalid"
          class="text-red-500 text-sm"
        >
          Password must be at least 6 characters.
        </p>
        <p
          v-if="v$.pass.$error && v$.pass.maxLength.$invalid"
          class="text-red-500 text-sm"
        >
          Password must be at most 12 characters.
        </p>

        <button
          type="submit"
          :disabled="loading"
          :class="[
            v$.pass.$error && v$.pass.minLength.$invalid ? 'mt-6' : 'mt-6',
          ]"
          class="w-full bg-[#1d58d6] text-white py-3 sm:py-3 mt-6 rounded-lg hover:bg-[#386ad7] transition duration-300 text-sm sm:text-[0.92rem] font-semibold disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
        >
          {{ loading ? "Signing In..." : "Sign In" }}
        </button>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from "../UI/BaseCard.vue";
import { ref, reactive } from "vue";
import { useUserStore } from "~/stores/UserStore";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, helpers } from "@vuelidate/validators";

const { t, locale, setLocale } = useI18n();

const UserStore = useUserStore();
const loading = ref(false);

const state = reactive({
  id: "",
  pass: "",
  ename: "",
  aname: "",
});

const arabicOnly = helpers.withMessage(
  "الأسم يجب ان يكون باللغة العربية",
  (value) => {
    if (!value) return false;
    return /^[\u0600-\u06FF\s]+$/.test(value);
  }
);

const englishOnly = helpers.withMessage("Name must be in English", (value) => {
  if (!value) return false;
  return /^[A-Za-z\s]+$/.test(value);
});

const rules = {
  id: { required },
  pass: { required, minLength: minLength(6), maxLength: maxLength(12) },
  ename: { required, englishOnly },
  aname: { required, arabicOnly },
};

const v$ = useVuelidate(rules, state);

const submitForm = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    UserStore.user.id = state.id;
    UserStore.user.ename = state.ename;
    UserStore.user.aname = state.aname;
    console.log("✅ Valid form:", state);
    navigateTo("/home/options");
  } else {
    console.log("❌ Invalid form");
  }
};

const logIn = () => {
  loading.value = true;
  setTimeout(() => {
    submitForm();
    loading.value = false;
  }, 500);
};
</script>
