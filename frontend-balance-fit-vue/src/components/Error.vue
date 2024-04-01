<template>
  <div :class="errorState ? 'error-notification' : 'error-notification-hidden'">
    <div class="error-message">
      <!-- Ciclar los errores -->
      <div v-for="(error, key) in errorMessages.errors" :key="error">
        <div v-for="e in error">
          <p class="error">
            <!-- Icono de error svg-->
            <ErrorIcon />
            <span class="p-1 truncate">{{ e }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ErrorIcon from "./Icons/Error.vue";
export default {
  components: {
    ErrorIcon,
  },
  computed: {
    ...mapState(["errorState", "errorMessages"]),
  },
}
</script>
