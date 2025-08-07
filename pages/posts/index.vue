<script setup>
import { onMounted, ref } from 'vue';

const posts = ref([]);

onMounted(async () => {
  try {
    const res = await fetch('/api/posts');
    posts.value = await res.json();
  } catch (err) {
    console.error('Failed to fetch posts:', err);
  }
});
</script>

<template>
  <div>
    <h1>All Posts</h1>
    <div v-if="posts.length === 0">No posts available.</div>

    <div v-for="post in posts" :key="post.id" class="post">
      <NuxtLink :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
      </NuxtLink>
      <h2>{{ post.title }}</h2>
      <div class="meta">
        by {{ post.author.username }} | {{ new Date(post.createdAt).toLocaleString() }}
      </div>
      <hr />
    </div>
  </div>
</template>

<style scoped>
.post {
  margin-bottom: 2rem;
}
.meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}
</style>
