<script setup lang="ts">
interface User {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
  preferences: string[];
}
const { user } = useAuth();

definePageMeta({ middleware: 'auth' });

const submitError = ref('');

async function handlePreferences() {
  const { status, error } = await useFetch('/api/profile', {
    method: 'patch',
    body: {
      preferences: preferences.value,
    },
  });
  submitError.value = error.value?.statusMessage!;
}

const { data } = await useFetch<User>('/api/profile', {
  method: 'get',
});
const preferences = ref(data.value!.preferences || []);
</script>

<template>
  <div class="flex flex-col wscreen hscreen overflow-hidden">
    <NavTop />
    <div class="flex flex-row wfull hfull overflow-hidden justify-center gap-4 py-4">
      <!-- Aside Left -->
      <div>
        <div class="flex flex-col p-8 gap-4 bg-white border border-black w-80 rounded-4">
          <div class="flex flex-row gap-4 items-center text-5 lh-5">
            <img :src="user!.image!" width="48px" height="48px" class="rounded-6" />
            <span>{{ user!.name! }}</span>
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
        </div>
      </div>
      <main class="justify-center flex hfull overflow-hidden">
        <div class="flex flex-col gap-8 hfull overflow-auto px-4 max-w-192">
          <!-- Profile Card goes here -->
          <div class="flex flex-col p-8 gap-4 bg-white border border-black w-80 rounded-4">
            <div class="flex flex-col gap-8 items-center text-5 lh-5">
              <h1 class="text-6">Update Preferences</h1>
              <form class="flex flex-col gap-4">
                <div class="flex gap-2 text-5">
                  <input
                    type="checkbox"
                    name="categories"
                    value="internship"
                    v-model="preferences"
                  />Internships
                </div>
                <div class="flex gap-2 text-5">
                  <input type="checkbox" name="categories" value="job" v-model="preferences" />Jobs
                </div>
                <div class="flex gap-2 text-5">
                  <input
                    type="checkbox"
                    name="categories"
                    value="research"
                    v-model="preferences"
                  />Research
                </div>
                <div class="flex gap-2 text-5">
                  <input
                    type="checkbox"
                    name="categories"
                    value="mentorship"
                    v-model="preferences"
                  />Mentorship
                </div>
                <div class="flex gap-2 text-5">
                  <input
                    type="checkbox"
                    name="categories"
                    value="scholarship"
                    v-model="preferences"
                  />Scholarship
                </div>
                <div class="flex gap-2 text-5">
                  <input
                    type="checkbox"
                    name="categories"
                    value="workshop"
                    v-model="preferences"
                  />Workshop
                </div>
                <div class="flex gap-2 text-5">
                  <input
                    type="checkbox"
                    name="categories"
                    value="study-abroad"
                    v-model="preferences"
                  />Study-abroad
                </div>
              </form>
              <el-alert
                v-if="submitError"
                :title="submitError"
                type="error"
                effect="dark"
                show-icon
                class="max-w-192"
              />
              <button
                @click="handlePreferences"
                class="aside__item wfull border-2 border-[#343A40] justify-center rounded-4 items-center py-2 bg-[#4790FC] text-white mt-4"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </main>
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
