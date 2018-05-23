<template>
  <div class="network-form-container">
    <el-row class='title'>
      <samp>网络设置</samp>
    </el-row>
    <el-row class="network-form">
      <el-form ref="networkSetting" :rules="networkSettingRules" :model="networkSetting" label-width="130px" size="small">
        <el-form-item label="显示终端设备地址:" prop="deviceID">
          <el-input v-model="networkSetting.deviceID"> </el-input>
        </el-form-item>
        <el-form-item label="网口1IP:" prop="IPaddress1">
          <el-input v-model="networkSetting.IPaddress1"> </el-input>
        </el-form-item>
        <el-form-item label="网口1掩码:" prop="netmask1">
          <el-input v-model="networkSetting.netmask1"> </el-input>
        </el-form-item>
        <el-form-item label="网口1网关:" prop="gateway1">
          <el-input v-model="networkSetting.gateway1"> </el-input>
        </el-form-item>
        <el-form-item label="网口2IP:" prop="IPaddress2">
          <el-input v-model="networkSetting.IPaddress2"> </el-input>
        </el-form-item>
        <el-form-item label="网口2掩码:" prop="netmask2">
          <el-input v-model="networkSetting.netmask2"> </el-input>
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
import { validateIP } from '@/utils/validate'
export default {
  name: 'NetworkForm',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    var checkIP = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入ip地址'))
      } else {
        if (!validateIP(value)) {
          callback(new Error('请输入合格的ip地址'))
        }
        callback()
      }
    }
    return {
      setLoading: false,
      type: 'networkSetting',
      networkSetting: {
        deviceID: '',
        IPaddress1: '',
        netmask1: '',
        gateway1: '',
        IPaddress2: '',
        netmask2: ''
      },
      networkSettingRules: {
        deviceID: [
          { required: true, message: '显示终端设备地址不能为空' },
          { type: 'number', message: '显示终端设备地址必须为数字' }],
        IPaddress1: [
          { validator: checkIP, trigger: 'blur' }],
        netmask1: [
          { validator: checkIP, trigger: 'blur' }],
        gateway1: [
          { validator: checkIP, trigger: 'blur' }],
        IPaddress2: [
          { validator: checkIP, trigger: 'blur' }],
        netmask2: [
          { validator: checkIP, trigger: 'blur' }]
      }
    }
  },
  methods: {
    getdata(id, type, params) {
      config(id, type, params).then(response => {
        this.networkSetting = response
      })
    },
    onSubmit() {
      this.$refs.networkSetting.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.setLoading = true
            const Formdata = Object.assign({}, this.networkSetting)
            config(this.id, this.type, Formdata).then(response => {
              this.setLoading = false
              this.networkSetting = response
              this.$message({
                type: 'success',
                message: '提交成功'
              })
            }).catch(result => {
              this.setLoading = false
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
      this.getdata(this.id, this.type)
    }
  },
  created() {
    this.getdata(this.id, this.type)
  }
}
</script>

<style lang="scss" scoped>
.network-form-container {
	background: #fff;
	padding: 16px 16px 0;
	.title {
		background: #fff;
		margin-bottom: 32px;
		> samp {
			font-size: 16px;
			color: #97a8be;
			cursor: text;
			font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		}
	}
	.network-form {
	}
}
</style>