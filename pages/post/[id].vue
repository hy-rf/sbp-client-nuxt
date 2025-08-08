<script setup lang="ts">
import type Post from "~/types/Post";

const route = useRoute();
const postId = route.params.id as string;
const url = useRequestURL();
const { data: post, error } = await useFetch<Post>(`${url.origin}/api/post/${postId}`);
</script>

<template>
  <div class="container">
    <div v-if="post" class="card">
      <h1 class="title">{{ post.title }}</h1>

      <div class="content" v-html="post.content"></div>

      <p class="meta">Created at: {{ new Date(post.createdAt).toLocaleString() }}</p>

      <hr />

      <div class="author-section">
        <h3 class="subtitle">Author Info</h3>
        <ul class="author-list">
          <li><strong>Name:</strong> {{ post.author.fullName }}</li>
          <li><strong>Email:</strong> {{ post.author.email }}</li>
          <li>
            <strong>Verified:</strong>
            <span :class="post.author.emailVerified ? 'verified' : 'unverified'">
              {{ post.author.emailVerified ? "Yes" : "No" }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="error" class="error">
      <p>Error loading post: {{ error.message }}</p>
    </div>

    <div v-else class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.card {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #222;
}

.content {
  line-height: 1.7;
  margin-bottom: 20px;
}

.content h2, .content h3, .content p {
  margin-bottom: 16px;
}

.meta {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 20px;
}

hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 24px 0;
}

.author-section {
  margin-top: 20px;
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #444;
}

.author-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.author-list li {
  margin-bottom: 6px;
}

.verified {
  color: green;
  font-weight: bold;
}

.unverified {
  color: red;
  font-weight: bold;
}

.error {
  background-color: #ffe6e6;
  color: #b00020;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f5c2c2;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 1.1rem;
  color: #888;
  padding: 40px 0;
}
</style>
