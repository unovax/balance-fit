<template>
  <div class="error-notification">
    <div class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: "An error occurred.",
    };
  },
};
</script>

<style scoped>
.error-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.error-message {
  font-size: 16px;
}
</style>
