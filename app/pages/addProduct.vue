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
              اسم المنتج بالعربية
            </label>
            <UInput
              v-model="form.titleAr"
              class="w-full"
              placeholder="أدخل اسم المنتج"
              @input="v$.titleAr.$touch()"
            />
            <p v-if="v$.titleAr.$error" class="text-red-500 text-sm mt-1">
              {{ v$.titleAr.$errors[0].$message }}
            </p>
          </div>

          <!-- English Name -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              اسم المنتج بالإنجليزية <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.titleEn"
              class="w-full text-end"
              placeholder="Enter product name"
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
              رمز المنتج (SKU) <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.id"
              class="w-full"
              placeholder="PROD-001"
              @blur="v$.id.$touch()"
            />
            <p v-if="v$.id.$error" class="text-red-500 text-sm mt-1">
              {{ v$.id.$errors[0].$message }}
            </p>
          </div>

          <!-- Category -->
          <div>
            <label class="block mb-1 text-sm font-medium text-end">
              الفئة <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category"
              @blur="v$.category.$touch()"
              class="border border-gray-300 rounded-md py-2 px-2 w-full"
            >
              <option value="" disabled hidden>اختار الفئة</option>
              <option>Electronics</option>
              <option>Jewelery</option>
              <option>Men's Clothing</option>
              <option>Women's Clothing</option>
            </select>
            <p v-if="v$.category.$error" class="text-red-500 text-sm mt-1">
              {{ v$.category.$errors[0].$message }}
            </p>
          </div>

          <!-- Price -->
          <div>
            <label class="block mb-1 text-end text-sm font-medium">
              السعر (ريال) <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.price"
              class="w-full"
              type="number"
              step="0.1"
              placeholder="0.0"
              @blur="v$.price.$touch()"
            />
            <p v-if="v$.price.$error" class="text-red-500 text-sm mt-1">
              {{ v$.price.$errors[0].$message }}
            </p>
          </div>

          <!-- Stock -->
          <div>
            <label class="block mb-1 text-sm text-end font-medium">
              الكمية المتوفّرة <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.stock"
              class="w-full"
              type="number"
              placeholder="0"
              @blur="v$.stock.$touch()"
            />
            <p v-if="v$.stock.$error" class="text-red-500 text-sm mt-1">
              {{ v$.stock.$errors[0].$message }}
            </p>
          </div>

          <!-- Image -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              رابط صورة المنتج
            </label>
            <UInput
              v-model="form.image"
              class="w-full"
              type="url"
              placeholder="https://example.com/product.jpg"
            />
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block mb-1 text-sm text-end font-medium">
              الوصف
            </label>
            <UTextarea
              v-model="form.description"
              class="w-full"
              placeholder="أدخل وصف المنتج"
            />
          </div>

          <!-- Status + Buttons -->
          <div class="md:col-span-2 flex items-center justify-between mt-4">
            <div>
              <label class="block mb-1 text-sm font-medium">الحالة</label>
              <select
                v-model="form.status"
                class="border border-gray-300 rounded-md py-2 px-2 w-full"
              >
                <option value="Active">Active</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            <div class="flex gap-4 mt-4 md:mt-20">
              <button
                type="button"
                @click="cancelAdd"
                class="px-10 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                إلغاء
              </button>

              <button
                type="submit"
                class="px-10 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                اضافة المنتج
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

const dashStore = useDashStore();
const router = useRouter();

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

// Validation rules
const rules = {
  id: { required: helpers.withMessage("رمز المنتج مطلوب", required) },
  titleAr: {
    arabicOnly: helpers.withMessage(
      "الاسم يجب أن يكون باللغة العربية فقط",
      (value) => !value || /^[\u0600-\u06FF\s]+$/.test(value)
    ),
  },
  titleEn: {
    required: helpers.withMessage("Name in English is required", required),
    englishOnly: helpers.withMessage("Name must be in English only", (value) =>
      /^[A-Za-z\s]+$/.test(value)
    ),
  },
  category: { required: helpers.withMessage("الفئة مطلوبة", required) },
  price: {
    required: helpers.withMessage("السعر مطلوب", required),
    minValue: helpers.withMessage(
      "يجب أن يكون السعر أكبر من 0 ",
      minValue(0.01)
    ),
  },
  stock: {
    required: helpers.withMessage("الكمية مطلوبة", required),
    minValue: helpers.withMessage(
      "يجب أن تكون الكمية اكبر من او يساوي 0 ",
      minValue(0)
    ),
  },
  description: {},
  status: { required },
  image: {},
};

const v$ = useVuelidate(rules, form);

// Submit function
function handleAddProduct() {
  v$.value.$touch();
  if (v$.value.$invalid) {
    alert("⚠️ من فضلك املأ جميع الحقول المطلوبة بشكل صحيح");
    return;
  }

  dashStore.addNewProduct({
    ...form,
    price: parseFloat(form.price),
    stock: parseInt(form.stock),
  });

  // clear fields
  Object.keys(form).forEach((key) => {
    form[key] = key === "status" ? "Active" : "";
  });

  router.push("/prodManagement");
}

function cancelAdd() {
  if (confirm("هل أنت متأكد أنك تريد إلغاء اضافة المنتج؟")) {
    router.push("/prodManagement");
  }
}
</script>
