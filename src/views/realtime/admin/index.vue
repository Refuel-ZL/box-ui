<template>
  <div class="realtime-table-container">
    <div>
      <el-row class='realtime-table-title'>
        <span>{{ batteryGroup }} </span>
      </el-row>
      <el-row>
        <realtime-table :table_data="table_data"></realtime-table>
      </el-row>
      <el-row>
        <el-dialog title="提示" :visible.sync="dialogVisible" :show-close="false" :modal-append-to-body="false" :append-to-body="false" :close-on-click-modal="false" :close-on-press-escape="false" width="400px">
          <el-form :model="setForm" ref="setForm">
            <el-form-item label="请选择蓄电池组" prop="id">
              <el-select v-model="setForm.id" placeholder="请选择蓄电池组" filterable>
                <el-option v-for="{id,name} in listall_data" :key="id" :label="name" :value="id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click.native="setSubmit">提交</el-button>
          </div>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>
<script>
import realtimetable from './components/realtimetable'
import { listAll, realtime } from '@/api/battery'
import { getobject } from '@/utils/custom'
import { parseTime } from '@/utils/'
import { validatePlus } from '@/utils/validate'
export default {
  name: 'realtime-admin',
  components: {
    'realtime-table': realtimetable
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
      // 新增界面数据
      setForm: {
        id: null
      }
    }
  },

  methods: {
    getParams() {
      this.setid(this.$route.params.id)
    },
    getrealtimedata(id = this.id) {
      realtime(id).then(response => {
        this.table_data = []
        this.table_data = response
        this.table_data.time = parseTime(new Date())
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
        this.batteryGroup = val === null ? id + ' 电池组' : val
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
        this.gettxt()
        this.getrealtimedata()
        this.getdata()
      }
    },
    stop() {
      clearInterval(this.timer)
    },
    getdata() {
      this.timer = window.setTimeout(() => {
        if (this && !this._isDestroyed && this.id) {
          this.getrealtimedata(this.id)
          this.getdata()
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    }
  },
  created() {
    this.getParams()
    this.getlistdata()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.realtime-table-container {
	padding: 32px;
	background-color: rgb(240, 242, 245);
	> div {
		background: #fff;
		padding: 16px 16px 0;
		margin-bottom: 32px;
		.realtime-table-title {
			text-align: center;
			padding: 16px 0;
		}
	}
}
</style>


