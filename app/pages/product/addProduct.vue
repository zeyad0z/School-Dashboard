<template>
  <NuxtLayout name="dashboard-prod">
    <div
      class="min-h-screen flex justify-center bg-gradient-to-b from-[#F7FAFF] to-[#EEF3FA]"
    >
      <div
        class="h-[44rem] mt-10 bg-white w-full max-w-4xl rounded-2xl shadow-md p-10 overflow-y-auto"
      >
        <form
          class="grid grid-cols-1 md:grid-cols-2 gap-5"
          @submit.prevent="handleAddProduct"
        >
          <!-- Arabic Name -->
          <div>
            <label class="block text-end mb-1 text-sm font-medium">
              {{ $t("addProduct.titleAr") }}
            </label>
            <input
              v-model="form.titleAr"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              :placeholder="$t('addProduct.titleArPlaceholder')"
              @input="v$.titleAr.$touch()"
            />
            <p v-if="v$.titleAr.$error" class="text-red-500 text-sm mt-1">
              {{ v$.titleAr.$errors[0].$message }}
            </p>
          </div>

          <!-- English Name -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              {{ $t("addProduct.titleEn") }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.titleEn"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              :placeholder="$t('addProduct.titleEnPlaceholder')"
              @input="v$.titleEn.$touch()"
              @blur="v$.titleEn.$touch()"
            />
            <p v-if="v$.titleEn.$error" class="text-red-500 text-sm mt-1">
              {{ v$.titleEn.$errors[0].$message }}
            </p>
          </div>

          <!-- SKU -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              {{ $t("sku") }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.id"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              :placeholder="$t('sku_placeholder')"
              @blur="v$.id.$touch()"
            />
            <p v-if="v$.id.$error" class="text-red-500 text-sm mt-1">
              {{ v$.id.$errors[0].$message }}
            </p>
          </div>

          <!-- Category -->
          <div>
            <label class="block mb-1 text-sm font-medium text-end">
              {{ $t("category") }} <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category"
              @blur="v$.category.$touch()"
              class="px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] w-full"
            >
              <option value="" disabled hidden>
                {{ $t("select_category") }}
              </option>
              <option>{{ $t("electronics") }}</option>
              <option>{{ $t("jewelry") }}</option>
              <option>{{ $t("mens_clothing") }}</option>
              <option>{{ $t("womens_clothing") }}</option>
            </select>
            <p v-if="v$.category.$error" class="text-red-500 text-sm mt-1">
              {{ v$.category.$errors[0].$message }}
            </p>
          </div>

          <!-- Price -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              {{ $t("price") }} ({{ $t("sar") }})
              <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.price"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              type="number"
              step="0.1"
              :placeholder="$t('price_placeholder')"
              @blur="v$.price.$touch()"
            />
            <p v-if="v$.price.$error" class="text-red-500 text-sm mt-1">
              {{ v$.price.$errors[0].$message }}
            </p>
          </div>

          <!-- Stock -->
          <div>
            <label class="block mb-1 text-sm text-end font-medium">
              {{ $t("stock") }} <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.stock"
              class="w-full px-3 py-1 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              type="number"
              :placeholder="$t('stock_placeholder')"
              @blur="v$.stock.$touch()"
            />
            <p v-if="v$.stock.$error" class="text-red-500 text-sm mt-1">
              {{ v$.stock.$errors[0].$message }}
            </p>
          </div>

          <!-- Image -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              {{ $t("image_url") }}
            </label>
            <input
              v-model="form.image"
              class="w-full px-3 py-2 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              type="url"
              :placeholder="$t('enter_image_url')"
            />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              {{ $t("description") }}
            </label>
            <textarea
              v-model="form.description"
              class="w-full px-3 py-6 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3]"
              :placeholder="$t('description_placeholder')"
            />
          </div>

          <!-- Status + Buttons -->
          <div class="col-span-2 flex items-center justify-between">
            <div class="mt-4">
              <label class="block mb-1 text-sm font-medium">
                {{ $t("status_label") }}
              </label>
              <select
                v-model="form.status"
                class="px-3 py-2 border bg-white rounded-sm focus:outline-none border-gray-300 focus:ring-2 focus:ring-[#8FAEF3] w-full"
              >
                <option value="Active">{{ $t("active") }}</option>
                <option value="Out of Stock">{{ $t("out_of_stock") }}</option>
              </select>
            </div>

            <div class="flex gap-4 mt-10">
              <button
                type="button"
                @click="cancelAdd"
                class="px-10 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                {{ $t("cancel") }}
              </button>

              <button
                type="submit"
                class="px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {{ $t("submit") }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useDashStore } from "~/stores/DashStore.js";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";

const toast = useToast();
const dashStore = useDashStore();
const router = useRouter();
const { t } = useI18n();

const form = reactive({
  id: "",
  titleAr: "",
  titleEn: "",
  category: "",
  price: null,
  stock: null,
  description: "",
  status: "Active",
  image: "",
});

const rules = {
  id: { required: helpers.withMessage(t("required_field"), required) },
  titleAr: {
    arabicOnly: helpers.withMessage(
      t("invalid_arabic"),
      (value) => !value || /^[\u0600-\u06FF\s]+$/.test(value)
    ),
  },
  titleEn: {
    required: helpers.withMessage(t("required_field"), required),
    englishOnly: helpers.withMessage(t("invalid_english"), (value) =>
      /^[A-Za-z\s]+$/.test(value)
    ),
  },
  category: { required: helpers.withMessage(t("required_field"), required) },
  price: {
    required: helpers.withMessage(t("required_field"), required),
    minValue: helpers.withMessage(t("invalid_price"), minValue(0.01)),
  },
  stock: {
    required: helpers.withMessage(t("required_field"), required),
    minValue: helpers.withMessage(t("invalid_stock"), minValue(0)),
  },
  description: {},
  status: { required },
  image: {},
};

const v$ = useVuelidate(rules, form);

function handleAddProduct() {
  v$.value.$touch();
  if (v$.value.$invalid) {
    toast.add({
      title: t("form_error_title"),
      description: t("form_error_message"),
      color: "warning",
      duration: 3000,
    });
    return;
  }

  dashStore.addNewProduct({
    ...form,
    price: parseFloat(form.price),
    stock: parseInt(form.stock),
  });

  toast.add({
    title: t("form_success_title"),
    description: t("form_success_message"),
    color: "success",
    duration: 3000,
  });

  router.push("/product");
}

function cancelAdd() {
  toast.add({
    title: t("form_cancel_title"),
    description: t("form_cancel_message"),
    color: "error",
  });
  router.push("/product");
}
</script>
