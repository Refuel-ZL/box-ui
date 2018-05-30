<template>
  <div class="grouplog-table-container">
    <div>
      <el-row>
        <el-col>
          <!-- -->
          <el-form :inline="true" :model="formsearch" ref="formsearch" :rules="formsearchrules" class="demo-form-search">
            <el-form-item label="选择时间" prop="date">
              <el-date-picker v-model="formsearch.date" type="datetime" placeholder="选择日期时间" default-time="12:00:00" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
            </el-form-item>
            <el-form-item label="电池组" prop="id">
              <el-select v-model="formsearch.id" placeholder="电池组" filterable>
                <el-option v-for="{id,name} in listall_data" :key="id" :label="name" :value="id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('formsearch')">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row class='grouplog-table-title'>
        <span>{{ batteryGroup }} </span>
      </el-row>
      <el-row>
        <z-table :table_data="table_data"></z-table>
      </el-row>
    </div>
  </div>
</template>
<script>
import { z_table } from './components'
import { listAll, grouplog } from '@/api/battery'
import { getobject } from '@/utils/custom'
import { parseTime } from '@/utils/'
import { validatePlus } from '@/utils/validate'

export default {
  name: 'grouplog-admin',
  components: {
    'z-table': z_table
  },
  data() {
    return {
      id: null,
      status: true,
      table_data: {},
      listall_data: [],
      batteryGroup: '电池组',
      dialogVisible: false,
      timer: null,
      formsearchrules: {
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请选择蓄电池组', trigger: 'blur' }
        ]
      },
      formsearch: {
        id: 1,
        date: new Date()
      }
    }
  },

  methods: {
    getParams() {
      this.setid(this.$route.params.id)
    },
    getrealtimedata(id = this.id, date) {
      this.gettxt(id)
      grouplog(id, date).then(response => {
        this.table_data = []
        this.table_data = response
        this.table_data.time = parseTime(date)
      })
    },
    getlistdata() {
      listAll().then(response => {
        this.listall_data = response
        this.gettxt()
      })
    },
    gettxt(id = this.$route.params.id) {
      try {
        id = Number(id)
        if (isNaN(id)) {
          return
        }
        const val = getobject(this.listall_data, 'id', id, 'name')
        console.log(val)
        this.batteryGroup = val === null ? id + '# 电池组' : val
      } catch (error) {
        console.dir(error)
      }
    },
    setid(id) {
      console.log('asdsa: ' + id, validatePlus(id))
      this.stop()
      if (!validatePlus(id)) {
        this.table_data = {}
        return
      } else {
        this.id = id
        this.formsearch.id = parseInt(id)
        this.gettxt()
        if (this.id && this.formsearch.date) {
          this.getrealtimedata(this.id, this.formsearch.date)
        }
      }
    },
    stop() {
      // clearInterval(this.timer)
    },
    getdata(params) {
      if (this && !this._isDestroyed && this.id) {
        this.getrealtimedata(params.id, params.date)
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var Formdata = Object.assign({}, this[formName])
          Formdata.date = parseTime(Formdata.date)
          console.log(Formdata)
          this.getdata(Formdata)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created() {
    this.getParams()
    this.getlistdata()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.grouplog-table-container {
	padding: 32px;
	background-color: rgb(240, 242, 245);
	> div {
		background: #fff;
		padding: 16px 16px 0;
		margin-bottom: 32px;
		.grouplog-table-title {
			text-align: center;
			padding: 16px 0;
		}
	}
}
</style>


