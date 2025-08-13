// ...existing code...
<script setup lang="ts">
import type Reply from "~/types/Reply";

const props = defineProps<{ postId?: string; replyId?: string }>();

const replies = ref<Reply[]>([]);

async function load() {
  if (props.postId) {
    replies.value = await $fetch<Reply[]>(`/api/post/${props.postId}/replies`);
  }
  if (props.replyId) {
    replies.value = await $fetch<Reply[]>(`/api/reply/${props.replyId}/replies`);
  }
}

onMounted(load);
watch(() => props.postId, load);
</script>

<template>
  <ul>
    <li v-for="r in replies" :key="r.id">
      <strong>{{ r.author?.username || "Anon" }}</strong
      >: {{ r.content }}
      <ReplyList :replyId="r.id.toString()"></ReplyList>
    </li>
    <li v-if="!replies.length">No replies yet.</li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 0.35rem 0.5rem;
  font-size: 0.85rem;
}
</style>
