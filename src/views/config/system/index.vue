<template>
  <div class="battery-system-container">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="8">
        <SystemForm :id="id"></SystemForm>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <CapCheckForm :id="id"></CapCheckForm>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8">
        <NetworkForm :id="id"></NetworkForm>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { CapCheckForm, NetworkForm, SystemForm } from './components'
export default {
  name: 'battery-system',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
    }
  },
  components: {
    CapCheckForm,
    NetworkForm,
    SystemForm
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.battery-system-container {
	// width: 90%;
	margin: 0 auto;
	.form {
		margin: 0 auto;
	}
}
</style>
