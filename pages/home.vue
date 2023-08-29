<script setup lang="ts">
import type { Post } from '~/server/utils/post';
import type { User } from '~/server/utils/user';

definePageMeta({ middleware: 'auth' });

const { user } = useAuth();
const posts = ref<Post[]>([]);
const { data } = await useFetch<Post[]>('/api/posts');
posts.value = data.value!;

async function updatePosts() {
  const { data } = await useFetch<Post[]>('/api/posts', {
    query: {
      categories: categories.value.toString(),
    },
  });
  posts.value = data.value!;
}

const { data: profile } = await useFetch<User>('/api/profile');

const categories = ref(profile.value!.preferences || []);
watch(categories, updatePosts);
</script>

<template>
  <div class="flex flex-col wscreen hscreen overflow-hidden">
    <NavTop />
    <div class="flex flex-row wfull hfull overflow-hidden justify-center gap-4 py-4">
      <AsideLeft :user="(user!)" />
      <main class="justify-center flex hfull overflow-hidden">
        <div class="flex flex-col gap-8 hfull overflow-auto px-4 max-w-192">
          <Post @delete="updatePosts" v-for="(post, i) of posts" :key="post._id" :post="post" />
        </div>
      </main>
      <AsideRight v-model:categories="categories" />
    </div>
  </div>
</template>
