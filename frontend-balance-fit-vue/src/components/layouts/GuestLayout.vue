<template>
  <div class="guest-layout">
      <router-view @errorHandler="setError"></router-view>
  </div>
</template>

<script>
export default {
  name: 'GuestLayout',
  // Component logic goes here
  methods: {
    setError(error) {
      console.log(error);
    }
  }
}
</script>
