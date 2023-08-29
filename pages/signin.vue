<script setup lang="ts">
const { signIn, signOut, session, status, cookies, getProviders } = useAuth();

let responseMessage: string;

async function submit(e: SubmitEvent) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const response = await fetch('/api/signup', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  responseMessage = data.error;
}
</script>

<template>
  <div>
    <div class="signup_container">
      <h1>Sign Up</h1>
      <form>
        <label>
          Name
          <input type="text" id="name" name="name" placeholder="enter your name" required />
        </label>
        <label>
          Email
          <input type="email" id="email" name="email" placeholder="enter your name" required />
        </label>
        <label>
          Password
          <input type="password" id="password" name="password" placeholder="password" required />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="re-enter password"
            required
          />
        </label>
        <button>Sign Up</button>
        <span>{{ responseMessage }}</span>
      </form>
      <a href="/api/auth/signin" class="buttonPrimary">Native Link Sign in</a>
      <button @click="signIn(`google`)">Google</button>
      <button @click="signIn(`linkedin`)">LinkedIn</button>
      <button @click="signOut()">Sign Out</button>
    </div>
    <div>
      <pre>{{ status }}</pre>
      <pre>{{ session?.user }}</pre>
      <pre>{{ cookies }}</pre>
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 0.75rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0rem;
}

.signup_container {
  width: 24rem;
  margin-top: 25%;
}
</style>
