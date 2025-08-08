<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type Post from "~/types/Post";


const { data: posts, error } = await useFetch<Array<Post>>(`/api/posts`);
</script>

<template>
  <div class="container">
    <h1 class="page-title">All Posts</h1>

    <div v-if="posts && posts.length === 0" class="empty">
      No posts available.
    </div>

    <div
      v-else
      v-for="post in posts"
      :key="post.id"
      class="post-card"
    >
      <NuxtLink :to="`/post/${post.id}`" class="post-title-link">
        <h2 class="post-title">{{ post.title }}</h2>
      </NuxtLink>

      <div class="meta">
        by
        <NuxtLink
          :to="`/user/${post.author.id}`"
          class="author-link"
        >
          {{ post.author.username }}
        </NuxtLink>
        |
        <span class="date">{{ new Date(post.createdAt).toLocaleString() }}</span>
      </div>

      <hr />
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

.page-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.empty {
  text-align: center;
  color: #888;
  font-size: 1rem;
  margin-top: 2rem;
}

.post-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
  margin-bottom: 1.5rem;
}

.post-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.post-title-link {
  text-decoration: none;
  color: inherit;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.meta .author {
  font-weight: 500;
}

.meta .date {
  font-style: italic;
}

hr {
  border: none;
  border-top: 1px solid #eee;
}
</style>
