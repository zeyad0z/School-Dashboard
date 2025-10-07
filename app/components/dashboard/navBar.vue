<template>
  <header
    class="flex items-center justify-between w-full bg-white px-10 py-4 shadow-md"
  >
    <!-- Left section -->
    <div class="flex gap-5">
      <!-- Sidebar toggle button-->
      <Button class="text-blue-600" @click="$emit('toggle-sidebar')">
        <UIcon name="i-lucide-menu" class="w-4 h-4" />
      </Button>

      <!-- Dropdowns -->
      <select class="border-1 border-blue-200 rounded-md px-3 py-1.5">
        <option>School Manager</option>
      </select>
      <select class="border-1 border-blue-200 rounded-md px-3 py-1.5">
        <option>Testing branch</option>
      </select>
      <select class="border-1 border-blue-200 rounded-md px-3 py-1.5">
        <option>2025/2026</option>
      </select>

      <input
        type="search"
        placeholder="🔍  Search..."
        class="border-1 border-blue-200 rounded-md px-3 py-1.5 w-[16rem] bg-blue-50"
      />
    </div>

    <!-- Right section -->
    <div class="flex items-center gap-4">
      <!-- Notifications -->
      <div class="relative">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-lucide-bell"
          class="text-blue-600"
        />
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-[1px]"
        >
          32
        </span>
      </div>

      <!-- Language switch -->
      <div class="flex items-center gap-2">
        <select class="text-blue-600">
          <option>EN</option>
          <option>AR</option>
        </select>
        <UIcon name="i-lucide-globe" class="w-4 h-4 text-blue-600" />
      </div>

      <!-- User info -->
      <div
        class="flex items-center gap-2rounded-lg px-3 py-2 bg-blue-50 rounded-md"
      >
        <div class="text-right mr-2">
          <p class="text-sm font-semibold">International Manager</p>
          <p class="text-xs text-blue-600">Administrator</p>
        </div>
        <UAvatar
          size="lg"
          src="https://ui-avatars.com/api/?name=Manager"
          alt="User Avatar"
        />
      </div>
    </div>
  </header>
</template>

<script setup></script>
