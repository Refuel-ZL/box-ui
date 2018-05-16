<template>
  <div class="realtime-container">
    <component :is="currentRole" ref="table"  ></component>
  </div>
</template>
<script>
import adminrealtime from './admin'
export default {
  name: 'realtime',
  components: {
    adminrealtime
  },
  beforeRouteUpdate(to, from, next) {
    var _this = this
    next()
    _this.$refs.table.setid(this.$route.params.id)
  },
  beforeRouteLeave(to, from, next) {
    var _this = this
    next()
    _this.$refs.table.stop()
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



