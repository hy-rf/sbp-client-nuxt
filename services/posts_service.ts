import type Post from "~/types/Post";

export async function fetchPosts(params: Record<string, any>) {
  return await $fetch<Post[]>("/api/posts/search", {
    query: params
  });
}