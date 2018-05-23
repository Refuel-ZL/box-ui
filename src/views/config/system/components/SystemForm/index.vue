<template>
  <div class="system-form-container">
    <el-row class='title'>
      <samp>系统设置</samp>
    </el-row>
    <el-row class="system-form">
      <el-form ref="systemSetting" :model="systemSetting" :rules="systemSettingRules" label-width="130px" size="small">
        <el-form-item label="生产厂商:" prop="manufacturer">
          <el-input v-model="systemSetting.manufacturer"> </el-input>
        </el-form-item>
        <el-form-item label="电池型号:" prop="batterymodel">
          <el-input v-model="systemSetting.batterymodel"> </el-input>
        </el-form-item>
        <el-form-item label="电池数量:">
          <el-input-number size="mini" v-model="systemSetting.batteryCount" :min="0" label="输入电池数量"></el-input-number>
        </el-form-item>
        <el-form-item label="投产日期:">
          <el-date-picker v-model="systemSetting.commissionDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="均衡电压:">
          <el-input-number v-model="systemSetting.balancedVol" controls-position="right"> </el-input-number> V
        </el-form-item>
        <el-form-item label="内阻测试间">
          <el-input-number size="mini" v-model="systemSetting.resInterval" controls-position="right" :min="0"></el-input-number> 天
        </el-form-item>
        <el-form-item label="电压测试间隔">
          <el-input-number size="mini" v-model="systemSetting.volInterval" controls-position="right" :min="0"></el-input-number> 分钟
        </el-form-item>
        <el-form-item label="数据保存时长">
          <el-input-number size="mini" v-model="systemSetting.dataHoldTime" controls-position="right" :min="0"></el-input-number> 月
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="setLoading">提交</el-button>
          <el-button @click="onRefresh">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { config } from '@/api/battery'

export default {
  name: 'SystemForm',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      setLoading: false,
      type: 'systemSetting',
      systemSetting: {
        manufacturer: '',
        batterymodel: '',
        batteryCount: '',
        commissionDate: null,
        balancedVol: '',
        resInterval: '',
        volInterval: '',
        dataHoldTime: ''
      },
      systemSettingRules: {
        manufacturer: [{ required: true, message: '不能为空', trigger: 'blur' }],
        batterymodel: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getdata(id, type, params) {
      config(id, type, params).then(response => {
        this.systemSetting = response
      })
    },
    onSubmit() {
      this.$refs.systemSetting.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.setLoading = true
            var Formdata = Object.assign({}, this.systemSetting)
            console.log(Formdata)
            config(this.id, 'systemSetting', Formdata).then(response => {
              this.setLoading = false
              this.systemSetting = response
              this.$message({
                type: 'success',
                message: '提交成功'
              })
            }).catch(result => {
              this.setLoading = false
              console.info(result)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
        }
      })
    },
    onRefresh() {
      this.getdata(this.id, 'systemSetting')
    }
  },
  created() {
    this.getdata(this.id, 'systemSetting')
  }
}
</script>
<style lang="scss" scoped>
.system-form-container {
	background: #fff;
	padding: 16px 16px 0;
	.title {
		background: #fff;
		// padding: 16px 16px 0;
		margin-bottom: 32px;
		> samp {
			font-size: 16px;
			color: #97a8be;
			cursor: text;
			font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		}
	}
	.system-form {
	}
}
</style>

