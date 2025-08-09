<script setup lang="ts">
import type Post from "~/types/Post";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

//const baseApiUrl = import.meta.server ? "http://localhost:8080" : "/api";
//const baseApiUrl = "/api"
// because it must be rendered on the server side, we cannot use relative paths like "/api" directly
const baseApiUrl = "http://localhost:8080"
// Filters state (initialized from URL)
const keyword = ref(route.query.keyword ?? "");
const authorName = ref(route.query.authorName ?? "");
const createdAfter = ref(route.query.createdAfter ?? "");
const createdBefore = ref(route.query.createdBefore ?? "");
const sortBy = ref(route.query.sortBy ?? "createdAt");
const order = ref(route.query.order ?? "desc");

// Data & fetch method
const posts = ref<Array<Post>>([]);
const loading = ref(false);

async function fetchPosts() {
  loading.value = true;

  const query = {
    keyword: keyword.value || undefined,
    authorName: authorName.value || undefined,
    createdAfter: createdAfter.value || undefined,
    createdBefore: createdBefore.value || undefined,
    sortBy: sortBy.value,
    order: order.value,
  };

  // Update URL params
  router.replace({ query });

  // Fetch from backend
  const { data } = await useFetch<Array<Post>>(`${baseApiUrl}/posts/search`, {
    query,
    server: true,
    lazy: false,
  });

  posts.value = data.value || [];
  loading.value = false;
}

await fetchPosts();

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

      <button @click="fetchPosts" :disabled="loading">
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
