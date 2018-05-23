<template>
  <div class="global-form-container">
    <el-row class='title'>
      <samp>全局报警配置</samp>
    </el-row>
    <el-row class="global-form">
      <el-form ref="alarmSetting" :rules="alarmSettingRules" :model="alarmSetting" label-width="130px" size="small">
        <el-col :span="12">
          <el-form-item label="电压高报警阈值:">
            <el-input-number v-model="alarmSetting.highVolAlarm" controls-position="right"> </el-input-number> V
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电压低报警阈值:">
            <el-input-number v-model="alarmSetting.lowVolAlarm" controls-position="right"> </el-input-number> V
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="温度高报警阈值:">
            <el-input-number v-model="alarmSetting.highTemAlarm" controls-position="right"></el-input-number> ℃
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="温度低报警阈值:">
            <el-input-number v-model="alarmSetting.lowTemAlarm" controls-position="right"></el-input-number> ℃
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组电压高报警阈值:">
            <el-input-number v-model="alarmSetting.highGroupVolAlarm" controls-position="right"></el-input-number> V
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组电压低报警阈值:">
            <el-input-number v-model="alarmSetting.lowGroupVolAlarm" controls-position="right"></el-input-number> V
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内阻高报警阈值:">
            <el-input-number v-model="alarmSetting.highResAlarm" controls-position="right"></el-input-number> uΩ
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="setLoading">提交</el-button>
            <el-button @click="onRefresh">刷新</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { config } from '@/api/battery'
export default {
  name: 'GlobalForm',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      setLoading: false,
      type: 'alarmSetting',
      alarmSetting: {
        highVolAlarm: null,
        lowVolAlarm: null,
        highResAlarm: null,
        highTemAlarm: null,
        lowTemAlarm: null,
        highGroupVolAlarm: null,
        lowGroupVolAlarm: null
      },
      alarmSettingRules: {
        // groupThreVol: [{ required: true, message: '不能为空', trigger: 'blur' }],
        // singleThreVol: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getdata(id, type, params) {
      config(id, type, params).then(response => {
        this.alarmSetting = response
      })
    },
    onSubmit() {
      this.$refs.alarmSetting.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.setLoading = true
            const Formdata = Object.assign({}, this.alarmSetting)
            console.log(Formdata)
            config(this.id, this.type, Formdata).then(response => {
              this.setLoading = false
              this.alarmSetting = response
              this.$message({
                type: 'success',
                message: '提交成功'
              })
            }).catch(result => {
              this.setLoading = false
              console.info(result)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提交'
              })
            })
          })
        }
      })
    },
    onRefresh() {
      this.getdata(this.id, this.type)
    }
  },
  created() {
    this.getdata(this.id, this.type)
  }
}
</script>

<style lang="scss" scoped>
.global-form-container {
	background: #fff;
	.title {
		background: #fff;
		padding: 16px 16px 0;
		margin-bottom: 32px;
		> samp {
			font-size: 16px;
			color: #97a8be;
			cursor: text;
			font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		}
	}
	.global-form {
	}
}
</style>