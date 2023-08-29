<script setup lang="ts">
import { Post } from '~/server/utils/post';

const emit = defineEmits<{ (e: 'delete'): void }>();
const props = defineProps<{ post: Post }>();
const post = ref(props.post); // bad practice without watch func| props is a reactive not a ref

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  month: 'numeric',
  day: 'numeric',
  year: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

const postDate = dateTimeFormat.format(new Date(props.post.timestamp));

async function handleDeletePost() {
  await useFetch(`/api/posts/${props.post._id}`, {
    method: 'delete',
  });
  emit('delete');
}

async function handleLike() {
  await useFetch('/api/like', {
    method: 'patch',
    body: {
      post_id: props.post._id,
    },
  });

  await updatePost();
}

async function updatePost() {
  const { data } = await useFetch<Post>(`/api/posts/${post.value._id}`);

  post.value = data.value!;
}
</script>

<template>
  <div class="box-card bg-white p-4 rounded-4 border border-black">
    <div class="post-content col">
      <div class="card-header row w-full">
        <img class="profile-img" :src="post.author_image" />
        <div class="col justify-evenly flex-1">
          <div class="row justify-between">
            <span class="text-xl text-black">{{ post.title }}</span>
          </div>
          <div class="justify-between row">
            <span class="text-gray-600">{{ post.author }}</span>
          </div>
        </div>
        <span
          class="flex px-3 py-3 items-center border border-solid border-[#343A40] rounded-1.5 text-3.5 text-[#343A40] h-4 font-medium"
        >
          {{ post.category }}
        </span>
      </div>
      <div class="card-body px-4">
        {{ post.body }}
      </div>
      <div class="card-footer">
        <div>
          <span class="text-gray-600 text-3.5 self-end">{{ postDate }}</span>
        </div>
        <div class="flex items-center">
          <span>{{ post.like_count || 0 }}</span>
          <button class="p-2 text-red text-5" @click="handleLike">
            <div :class="post.is_liked ? 'i-ic-round-favorite' : 'i-ic-round-favorite-border'" />
          </button>
          <button v-if="post.is_author" class="p-2 text-blue text-5">
            <div class="i-ic-round-edit-note"></div>
          </button>
          <el-popconfirm
            v-if="post.is_author"
            @confirm="handleDeletePost"
            title="Are you sure to delete this?"
          >
            <template #reference>
              <button class="p-2 text-gray text-5">
                <div class="i-ic:outline-delete"></div>
              </button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: left;
  gap: 0.75rem;
  width: 100%;
  min-width: 30rem;
}

.flex-1 {
  flex: 1;
}

.col {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  stroke: currentColor;
  align-items: center;
}

.post-content {
  gap: 1.5rem;
}

.profile-img {
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
}

.box-card {
  gap: 4rem;
}

.el-col {
  flex-shrink: unset;
}
</style>
