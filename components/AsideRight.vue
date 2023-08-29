<script setup lang="ts">
const props = defineProps<{ categories?: string[] }>();

const emit = defineEmits<{
  (e: 'update:categories', categories: string[]): void;
}>();

const categories = ref(props.categories);

watch(categories, () => emit('update:categories', categories.value!));
</script>

<template>
  <div>
    <div class="flex flex-col p-6 pt-4 gap-2 bg-white border border-black rounded-4 shrink-0">
      <h1 class="text-6">Categories</h1>
      <form class="flex flex-col gap-2">
        <div class="flex gap-2 text-5">
          <input
            type="checkbox"
            name="categories"
            value="internship"
            v-model="categories"
          />Internships
        </div>
        <div class="flex gap-2 text-5">
          <input type="checkbox" name="categories" value="job" v-model="categories" />Jobs
        </div>
        <div class="flex gap-2 text-5">
          <input type="checkbox" name="categories" value="research" v-model="categories" />Research
        </div>
        <div class="flex gap-2 text-5">
          <input
            type="checkbox"
            name="categories"
            value="mentorship"
            v-model="categories"
          />Mentorship
        </div>
        <div class="flex gap-2 text-5">
          <input
            type="checkbox"
            name="categories"
            value="scholarship"
            v-model="categories"
          />Scholarship
        </div>
        <div class="flex gap-2 text-5">
          <input type="checkbox" name="categories" value="workshop" v-model="categories" />Workshop
        </div>
        <div class="flex gap-2 text-5">
          <input
            type="checkbox"
            name="categories"
            value="study-abroad"
            v-model="categories"
          />Study-abroad
        </div>
      </form>
    </div>
  </div>
</template>
