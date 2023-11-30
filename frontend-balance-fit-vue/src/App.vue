<script setup>
</script>

<template>
  <router-view></router-view>
  <Error/>
</template>
<script>
  export default {
    name: 'App',
    components: {
      Error: () => import('/src/components/Error.vue')
    }
</script>
