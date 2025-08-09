<script setup lang="ts">
import type Post from "~/types/Post";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

// Filters state (initialized from URL query parameters)
const keyword = ref(route.query.keyword as string || "");
const authorName = ref(route.query.authorName as string || "");
const createdAfter = ref(route.query.createdAfter as string || "");
const createdBefore = ref(route.query.createdBefore as string || "");
const sortBy = ref(route.query.sortBy as string || "createdAt");
const order = ref(route.query.order as string || "desc");

// A computed property to neatly gather all filter refs.
// This will be used by our fetch function.
const queryParams = computed(() => ({
  keyword: keyword.value || undefined,
  authorName: authorName.value || undefined,
  createdAfter: createdAfter.value || undefined,
  createdBefore: createdBefore.value || undefined,
  sortBy: sortBy.value,
  order: order.value,
}));

// Use useAsyncData to fetch data.
// It returns 'data', 'pending', and a 'refresh' function.
// The initial fetch will happen on the server.
const { data: posts, pending: loading, refresh } = await useAsyncData(
  'postsSearch', // A unique key for this data fetch
  () => $fetch<Array<Post>>('https://udevkit.lol/api/posts/search', {
    // Pass the current value of our computed query params
    query: queryParams.value,
  }),
  {
    // Use a default value to prevent errors when `posts` is null initially
    default: () => [],
  }
);

// This function will be called when the search button is clicked.
async function performSearch() {
  // First, update the URL in the browser. This is good practice.
  await router.push({ query: queryParams.value });

  // Then, call refresh() to re-fetch the data with the new query parameters.
  await refresh();
}
</script>

<template>
  <div class="container">
    <h1 class="page-title">{{ t("posts.search") }}</h1>

    <!-- Filters -->
    <div class="filters">
      <input
        v-model="keyword"
        type="text"
        placeholder="Search title/content..."
      />
      <input v-model="authorName" type="text" placeholder="Author name..." />
      <input v-model="createdAfter" type="datetime-local" />
      <input v-model="createdBefore" type="datetime-local" />

      <select v-model="sortBy">
        <option value="createdAt">Created At</option>
        <option value="updatedAt">Updated At</option>
      </select>
      <select v-model="order">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      <button @click="performSearch" :disabled="loading">
        {{ loading ? "Loading..." : "Search" }}
      </button>
    </div>

    <div v-if="!loading && posts.length === 0" class="empty">
      No posts available.
    </div>

    <div v-else v-for="post in posts" :key="post.id" class="post-card">
      <NuxtLink :to="`/post/${post.id}`" class="post-title-link">
        <h2 class="post-title">{{ post.title }}</h2>
      </NuxtLink>

      <div class="meta">
        {{ t("posts.author") }}
        <NuxtLink :to="`/user/${post.author.id}`" class="author-link">
          {{ post.author.username }}
        </NuxtLink>
        |
        <ClientOnly>
          <span class="date">{{
            new Date(post.createdAt).toLocaleString()
          }}</span>
        </ClientOnly>
      </div>
      <hr />
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.filters input,
.filters select,
.filters button {
  padding: 8px;
  font-size: 0.9rem;
}
.filters button {
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.filters button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
