<script setup lang="ts">
const { user } = useAuth();
const router = useRouter();

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});
const date = new Date();
const postDate = dateTimeFormat.format(date);

const title = ref('');
const body = ref('');

const submitError = ref('');

async function submitPost() {
  const { status, error } = await useFetch('/api/posts', {
    method: 'post',
    body: {
      title: title.value,
      body: body.value,
      author: user.value!.name!,
    },
  });

  submitError.value = error.value?.statusMessage!;

  if (status.value === 'success') {
    router.push('/home');
  }
}
</script>

<template>
  <div>
    <div class="bg-white p-4 rounded-4 border border-black w-161">
      <!-- post -->
      <div class="flex flex-col gap-8">
        <!-- Post Header -->
        <div class="flex flex-row w-full gap-3">
          <img class="w-12 h-12 rounded-6" :src="user!.image!" />
          <div class="flex flex-col justify-evenly flex-1">
            <div
              class="flex flex-row justify-between border border-color-black rounded-2 overflow-hidden"
            >
              <el-input
                v-model="title"
                placeholder="Title"
                class="rounded-3"
                maxlength="160"
                clearable
              />
            </div>
            <div class="justify-between row">
              <span class="text-gray-600">{{ user!.name }}</span>
            </div>
          </div>
        </div>
        <!-- Post Body -->
        <div class="border border-color-black rounded-2 overflow-hidden">
          <el-input
            v-model="body"
            autosize
            type="textarea"
            placeholder="Body"
            class="rounded-3"
            clearable
            maxlength="1500"
          />
        </div>
        <!-- Post Footer -->
        <div class="flex flex-row justify-between items-center">
          <div>
            <span class="text-gray-600 text-3.5 self-end">{{ postDate }}</span>
          </div>
          <div class="flex gap-2">
            <NuxtLink to="/home">
              <button class="p-2 text-red text-6">
                <div class="i-ic-outline-cancel"></div>
              </button>
            </NuxtLink>
            <button @click="submitPost" class="p-2 text-blue text-6">
              <div class="i-ic-outline-send"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
