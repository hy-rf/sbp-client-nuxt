<script setup lang="ts">
import type Post from "~/types/Post";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

useSeoMeta({
  title: t("posts.title"),
  // description: t("posts.searchDescription"),
  ogTitle: t("posts.title"),
  // ogDescription: t("posts.searchDescription"),
  ogType: "website",
  twitterCard: "summary",
});

const keyword = ref(route.query.keyword as string || "");
const authorName = ref(route.query.authorName as string || "");
const createdAfter = ref(route.query.createdAfter as string || "");
const createdBefore = ref(route.query.createdBefore as string || "");
const sortBy = ref(route.query.sortBy as string || "createdAt");
const order = ref(route.query.order as string || "desc");

const queryParams = computed(() => ({
  keyword: keyword.value || undefined,
  authorName: authorName.value || undefined,
  createdAfter: createdAfter.value || undefined,
  createdBefore: createdBefore.value || undefined,
  sortBy: sortBy.value,
  order: order.value,
}));

const { data: posts, pending: loading, refresh } = await useAsyncData(
  'postsSearch',
  // If use /api/posts/search it will call localhost:8080/posts/search (by nitro proxy)
  // So use the full URL to avoid that
  () => $fetch<Array<Post>>(`${config.public.BASE_URL}/posts/search`, {
    query: queryParams.value,
  }),
  {
    default: () => [],
  }
);

async function performSearch() {
  await router.push({ query: queryParams.value });
  await refresh();
  console.log("Search performed with params:", queryParams.value);
}

watch(
  () => route.query,
  (newQuery) => {
    // Update refs from route.query
    keyword.value = newQuery.keyword as string || "";
    authorName.value = newQuery.authorName as string || "";
    createdAfter.value = newQuery.createdAfter as string || "";
    createdBefore.value = newQuery.createdBefore as string || "";
    sortBy.value = newQuery.sortBy as string || "createdAt";
    order.value = newQuery.order as string || "desc";

    // Refresh data based on new query params
    refresh();
  },
  { immediate: true }
);
</script>

<template>
  <div class="container">
    <h1 class="page-title">{{ t("posts.search") }}</h1>

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

      <button @click="performSearch" :disabled="false">
        {{ "Search" }}
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
