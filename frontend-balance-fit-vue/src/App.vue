<script setup>
</script>

<template>
  <router-view></router-view>
  <Error/>
</template>
<script>
import Error from './components/Error.vue'
  export default {
    components: {
      Error
    },
    name: 'App',
  }
</script>
