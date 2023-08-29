<script setup lang="ts">
interface User {
  email?: string | null;
  image?: string | null;
  name?: string | null;
}

defineProps<{ user: User }>();
</script>

<template>
  <div>
    <div class="flex flex-col p-8 gap-4 bg-white border border-black w-80 rounded-4">
      <div class="flex flex-row gap-4 items-center text-5 lh-5">
        <img :src="user!.image!" width="48px" height="48px" class="rounded-6" />
        <span>{{ user.name }}</span>
      </div>
      <nuxt-link class="aside__item mt-4" to="/home">
        <div class="i-ic-round-home" />
        Home
      </nuxt-link>
      <nuxt-link class="aside__item mt-4" to="/profile">
        <button class="aside__item">
          <div class="i-ic-round-person" />
          Profile
        </button>
      </nuxt-link>
      <nuxt-link to="/create-post" class="flex">
        <button
          class="aside__item wfull border-2 border-[#343A40] justify-center rounded-4 items-center py-1 bg-[#4790FC] text-white mt-4"
        >
          Create Post
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss">
.aside {
  display: flex;
  flex-direction: column;

  &__item {
    @apply flex items-center gap-2 text-5;
  }
}
</style>
