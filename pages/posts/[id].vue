<script setup lang="ts">
const route = useRoute()

console.log(route.params.id)

</script>

<template>
  <div>
    {{ route.params.id ? `Post ID: ${route.params.id}` : 'No Post ID provided' }}
  </div>
</template>

<style lang="css" scoped>

</style>