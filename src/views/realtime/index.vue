<template>
  <div class="realtime-container">
    <component :is="currentRole"></component>
  </div>
</template>
<script>
import adminrealtime from './admin'
export default {
  name: 'realtime',
  components: {
    adminrealtime
  },
  data() {
    return {
      currentRole: 'adminrealtime'
    }
  },
  methods: {
  },
  created() {
  }
}
</script>



