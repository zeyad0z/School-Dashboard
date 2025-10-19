<template>
  <div
    class="min-h-fit w-full flex justify-center items-center px-4 sm:px-6 lg:px-8"
  >
    <BaseCard class="mx-5">
      <div class="mb-8 pb-4 text-center">
        <h1 class="text-2xl text-black/85 sm:text-[1.95rem] font-bold mb-3">
          {{ t("welcome") }}
        </h1>
        <p class="text-gray-500 text-sm sm:text-[1.02rem] mt-3">
          {{ t("welcome message") }}
        </p>
      </div>

      <form @submit.prevent="logIn" class="mt-4 sm:mt-6">
        <!-- ID -->
        <label for="id" class="text-sm font-medium">
          {{ t("staff/student id") }}
        </label>
        <input
          type="text"
          name="id"
          :placeholder="
            v$.id.$error && v$.id.$dirty
              ? t('staff/student id') + ' ' + t('is required')
              : t('enter your id')
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

        <!-- English Name -->
        <label for="ename" class="text-sm font-medium">
          {{ t("name in english") }}
        </label>
        <input
          type="text"
          name="ename"
          :placeholder="
            v$.ename.$error && v$.ename.$dirty
              ? t('name in english') + ' ' + t('is required')
              : t('name in english placeholder')
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

        <!-- Arabic Name -->
        <label for="aname" class="text-sm font-medium">
          {{ t("Name in Arabic") }}
        </label>
        <input
          type="text"
          name="aname"
          :placeholder="
            v$.aname.$error && v$.aname.$dirty
              ? t('Name in Arabic') + ' ' + t('is required')
              : t('name in arabic placeholder')
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

        <!-- Password -->
        <label for="pass" class="text-sm font-medium">
          {{ t("password") }}
        </label>
        <input
          type="password"
          name="pass"
          :placeholder="
            v$.pass.$error && v$.pass.$dirty
              ? t('password') + ' ' + t('is required')
              : t('enter your password')
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
          {{ t("password_min_length") }}
        </p>
        <p
          v-if="v$.pass.$error && v$.pass.maxLength.$invalid"
          class="text-red-500 text-sm"
        >
          {{ t("password_max_length") }}
        </p>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          :class="[
            v$.pass.$error && v$.pass.minLength.$invalid ? 'mt-6' : 'mt-6',
          ]"
          class="w-full bg-[#1d58d6] text-white py-3 sm:py-3 mt-6 rounded-lg hover:bg-[#386ad7] transition duration-300 text-sm sm:text-[0.92rem] font-semibold disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
        >
          {{ loading ? t("signing in") : t("sign in") }}
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
import { useI18n } from "vue-i18n";

const toast = useToast();
const { t } = useI18n(); // ✅ keep this and use `t()` instead of `$t()`
const UserStore = useUserStore();
const loading = ref(false);

const state = reactive({
  id: "",
  pass: "",
  ename: "",
  aname: "",
});

const arabicOnly = helpers.withMessage(
  t("name_must_be_in_arabic"),
  (value) => !!value && /^[\u0600-\u06FF\s]+$/.test(value)
);

const englishOnly = helpers.withMessage(
  t("name_must_be_in_english"),
  (value) => !!value && /^[A-Za-z\s]+$/.test(value)
);

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

    toast.add({
      title: t("form_success_title"),
      description: t("form_success_desc"),
      color: "success",
    });

    navigateTo("/home/options");
  } else {
    toast.add({
      title: t("form_invalid_title"),
      description: t("form_invalid_desc"),
      color: "error",
    });
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
