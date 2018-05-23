<template>
  <div class="battery-alarm-container">
    <el-row>
      <el-col :xs="24">
        <GlobalForm :id="id"></GlobalForm>
      </el-col>
      <el-col :xs="24">
        <SingleForm :id="id"></SingleForm>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GlobalForm, SingleForm } from './components'
export default {
  name: 'battery-alarm',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {}
  },
  components: {
    GlobalForm, SingleForm
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>
<style lang="scss" scoped>
.battery-alarm-container {
  >.el-row{
    width: 800px;
    margin: 0 auto
  }
}
</style>

