<template>
  <div class="config-container">
    <component :is="currentRole" :id="id"></component>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validatePlus } from '@/utils/validate'
import systemBattery from './system'
import alarmBattery from './alarm'
export default {
  name: 'config',
  components: {
    systemBattery,
    alarmBattery
  },
  data() {
    return {
      id: null,
      subsets: ['systemBattery', 'alarmBattery'],
      currentRole: 'systemBattery'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  beforeRouteUpdate(to, from, next) {
    var _this = this
    next()
    _this.reload(this.$route.params.type, this.$route.params.id)
  },
  methods: {
    reload(sign, id) {
      if (this.subsets.indexOf(sign) >= 0 && validatePlus(id)) {
        this.id = id
        this.currentRole = sign
      } else {
        this.$router.push('/404')
      }
    }
  },
  created() {
    if (this.$route.params.type) {
      const sign = this.$route.params.type
      const id = this.$route.params.id
      this.reload(sign, id)
    }
  }
}
</script>
