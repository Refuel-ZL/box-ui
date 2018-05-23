<template>
  <div class="battery-system-container">
    alarmalarmalarm
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'battery-system',
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>
