<script setup lang="ts">
import { usePostSearchStore } from "~/stores/post_search";
import { fetchPosts } from "~/services/posts_service";
import type Post from "~/types/Post";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const searchStore = usePostSearchStore();

// Initialize store from URL on load
searchStore.setFromRoute(route.query);

// Form state (local only, not used by fetch until Search clicked)
const form = reactive({
  keyword: searchStore.keyword,
  authorName: searchStore.authorName,
  createdAfter: searchStore.createdAfter,
  createdBefore: searchStore.createdBefore,
  sortBy: searchStore.sortBy,
  order: searchStore.order,
  size: searchStore.size,
});

// API fetching
const {
  data: posts,
  pending,
  refresh,
  error,
} = await useAsyncData(
  () => `postsSearch-${JSON.stringify(route.query)}`,
  () => fetchPosts(route.query),
  { default: () => [] as Post[] }
);

// Watch route query → update store (and form)
watch(
  () => route.query,
  (q) => {
    searchStore.setFromRoute(q);
    Object.assign(form, {
      keyword: searchStore.keyword,
      authorName: searchStore.authorName,
      createdAfter: searchStore.createdAfter,
      createdBefore: searchStore.createdBefore,
      sortBy: searchStore.sortBy,
      order: searchStore.order,
      size: searchStore.size,
    });
    refresh();
  }
);

async function changeSize() {
  router.push({ query: searchStore.queryParams });
}

// Click search → copy form values into store → update query
async function performSearch() {
  searchStore.keyword = form.keyword;
  searchStore.authorName = form.authorName;
  searchStore.createdAfter = form.createdAfter;
  searchStore.createdBefore = form.createdBefore;
  searchStore.sortBy = form.sortBy;
  searchStore.order = form.order;
  searchStore.page = 1; // reset to first page
  await router.push({ query: searchStore.queryParams });
}

// Paging
function nextPage() {
  if (posts.value.length === searchStore.size) {
    searchStore.page++;
    router.push({ query: searchStore.queryParams });
  }
}
function prevPage() {
  if (searchStore.page > 1) {
    searchStore.page--;
    router.push({ query: searchStore.queryParams });
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ t("posts.search") }}</h1>

    <!-- Filters bound to form state, not store -->
    <div class="filters">
      <input v-model="form.keyword" placeholder="Search title/content..." />
      <input v-model="form.authorName" placeholder="Author name..." />
      <input type="datetime-local" v-model="form.createdAfter" />
      <input type="datetime-local" v-model="form.createdBefore" />
      <select v-model="form.sortBy">
        <option value="createdAt">Created At</option>
        <option value="updatedAt">Updated At</option>
      </select>
      <select v-model="form.order">
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <select v-model="searchStore.size" @change="changeSize">
        <option :value="1">1</option>
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
      <button @click="performSearch">{{ t("posts.search") }}</button>
    </div>

    <!-- Results -->
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error loading posts</div>
    <div v-else-if="posts.length === 0">No posts available</div>

    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post-card">
        <NuxtLink :to="`/post/${post.id}`">
          <h2>{{ post.title }}</h2>
        </NuxtLink>
        <div>
          {{ t("posts.author") }}:
          <NuxtLink :to="`/user/${post.author.id}`">
            {{ post.author.username }}
          </NuxtLink>
          |
          <ClientOnly>
            {{ new Date(post.createdAt).toLocaleString() }}
          </ClientOnly>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="prevPage" :disabled="searchStore.page <= 1">
          Prev
        </button>
        <span>Page {{ searchStore.page }}</span>
        <button @click="nextPage" :disabled="posts.length < searchStore.size">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
