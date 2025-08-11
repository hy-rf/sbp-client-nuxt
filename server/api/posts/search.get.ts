// File: server/api/posts/search.get.ts
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Construct backend URL (Java Spring Boot API)
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'

  // Make server-side fetch
  const res = await $fetch('/posts/search', {
    baseURL: backendUrl,
    params: query
  })

  return res
})
