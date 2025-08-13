<script setup lang="ts">
import type Reply from "~/types/Reply";

const { t } = useI18n();

defineProps({
  reply: {
    type: Object as () => Reply,
    required: true,
  },
});
</script>

<template>
  <li>
    <strong>{{ reply.author?.username || "Anon" }}</strong
    >:
    <p>{{ reply.content }}</p>
    <span class="text-xs text-gray-500">{{ reply.created.toString() }}</span>
    <button>Reply</button>
    <ReplyList :reply-id="reply.id.toString()"></ReplyList>
  </li>
</template>

<style lang="css" scoped></style>
