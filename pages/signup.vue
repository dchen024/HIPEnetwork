<script setup lang="ts">
definePageMeta({
  middleware: 'guest-only',
});

const { signIn } = useAuth();
</script>

<template>
  <div class="flex w-full hfull pt-15% flex-col items-center overflow-hidden bg-#343A40">
    <div class="flex flex-col w-80 p-8 border border-black bg-[#F8F4E7] rounded-2 gap-12">
      <div class="flex flex-row items-center gap-4">
        <img src="/img/HN.webp" width="48px" height="48px" />
        <span class="text-6 font-bold">HIPE Network</span>
      </div>
      <button @click="signIn(`google`)">
        <div class="flex gap-6 border border-black p-2 rounded-1 bg-white">
          <img src="https://api.iconify.design/logos:google-icon.svg" width="18px" height="18px" />
          <span class="text-3.5 op-54 font-medium">SIGN IN WITH GOOGLE</span>
        </div>
      </button>
      <!-- <button @click="signIn(`linkedin`)">LinkedIn</button> -->
    </div>
  </div>
</template>
