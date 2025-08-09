<script setup lang="ts">
import { ref } from "vue";
const username = ref("");
const password = ref("");
const error = ref("");

const userStore = useUserStore();
const router = useRouter();

async function login() {
  error.value = "";
  try {
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      credentials: "include",
    });
    if (res.ok) {
      userStore.fetchUser();
      router.push("/");
      error.value = "Login successful!";
      // TODO: Set user in user store
    } else {
      error.value = "Invalid credentials";
    }
  } catch {
    error.value = "Login failed";
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label>
        Username:
        <input v-model="username" type="text" required />
      </label>
      <label>
        Password:
        <input id="password" v-model="password" type="password" required />
      </label>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
label {
  display: block;
  margin-bottom: 1rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
#password {
  color: white;
}
</style>
