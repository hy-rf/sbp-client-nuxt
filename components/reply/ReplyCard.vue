<script setup lang="ts">
import type Reply from "~/types/Reply";

const { t } = useI18n();

const props = defineProps({
  reply: {
    type: Object as () => Reply,
    required: true,
  },
});
const refreshKey = ref(0);
function refreshReplies() {
  refreshKey.value++;
}

const replyContent = ref("");
const replyMessage = ref("");

const submitReply = async () => {
  replyMessage.value = "";
  try {
    const res = await fetch("/api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parentReplyId: props.reply.id,
        content: replyContent.value,
        // parentReplyId can be added here if replying to another reply
      }),
    });
    if (res.ok) {
      alert("Reply submitted!");
      replyContent.value = "";
      showReplyForm.value = false;
      refreshReplies(); // Trigger a refresh of replies
      // Optionally, reload replies here
    } else {
      replyMessage.value = await res.text();
    }
  } catch (e) {
    replyMessage.value = "Network error";
  }
};

const showReplyForm = ref(false);
</script>

<template>
  <li>
    <p>{{ reply.id }}</p>
    <strong>{{ reply.author?.username || "Anon" }}</strong
    >:
    <p>{{ reply.content }}</p>
    <span class="text-xs text-gray-500">{{ reply.created.toString() }}</span>
    <button @click="showReplyForm = !showReplyForm">Reply</button>
    <form v-if="showReplyForm" class="reply-form" @submit.prevent="submitReply">
      <label for="reply-content" class="reply-label">Add a reply:</label>
      <textarea
        id="reply-content"
        v-model="replyContent"
        class="reply-textarea"
        rows="3"
        required
      ></textarea>
      <button type="submit" class="reply-btn">Reply</button>
      <div v-if="replyMessage" class="reply-message">{{ replyMessage }}</div>
    </form>
    <ReplyList :key="refreshKey" :reply-id="reply.id.toString()"></ReplyList>
  </li>
</template>

<style lang="css" scoped></style>
