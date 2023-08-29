<script setup lang="ts">
const { signOut } = useAuth();
</script>

<template>
  <div class="header">
    <div class="flex justify-between">
      <div class="flex min-w-300 gap-1">
        <nuxt-link class="flex flex-row items-center gap-4" to="/home">
          <div class="image__container">
            <img src="/img/HN.webp" width="36px" height="36px" />
          </div>
          <h1>HIPE Network</h1>
        </nuxt-link>
      </div>
      <button class="text-4.25" @click="signOut()">Sign Out</button>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  background-color: white;
  border-bottom: 1px;
  border-color: black;
  border-style: solid;
}

.image-container {
  border-radius: 50%;
  display: flex;
  flex-direction: row;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}
</style>
