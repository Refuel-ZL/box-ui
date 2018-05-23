<template>
  <div class="capcheck-form-container">
    <el-row class='title'>
      <samp>核容放电设置</samp>
    </el-row>
    <el-row class="capcheck-form">
      <el-form ref="capCheckSetting" :rules="capCheckSettingRules" :model="capCheckSetting" label-width="130px" size="small">
        <el-form-item label="组放电截止电压:">
          <el-input-number v-model="capCheckSetting.groupThreVol" controls-position="right"> </el-input-number> V
        </el-form-item>
        <el-form-item label="单体放电截止电压:">
          <el-input-number v-model="capCheckSetting.singleThreVol" controls-position="right"> </el-input-number> V
        </el-form-item>
        <el-form-item label="持续时间:">
          <el-input-number v-model="capCheckSetting.duration" controls-position="right" :min="0"></el-input-number> 小时
        </el-form-item>
        <el-form-item label="采集间隔:">
          <el-input-number v-model="capCheckSetting.interval" controls-position="right" :min="0"></el-input-number> 分钟
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
  name: 'CapCheckForm',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      setLoading: false,
      type: 'capCheckSetting',
      capCheckSetting: {
        groupThreVol: '',
        singleThreVol: '',
        duration: '',
        interval: ''
      },
      capCheckSettingRules: {
        // groupThreVol: [{ required: true, message: '不能为空', trigger: 'blur' }],
        // singleThreVol: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getdata(id, type, params) {
      config(id, type, params).then(response => {
        this.capCheckSetting = response
      })
    },
    onSubmit() {
      this.$refs.capCheckSetting.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.setLoading = true
            const Formdata = Object.assign({}, this.capCheckSetting)
            console.log(Formdata)
            config(this.id, this.type, Formdata).then(response => {
              this.setLoading = false
              this.capCheckSetting = response
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
.capcheck-form-container {
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
	.capcheck-form {
	}
}
</style>