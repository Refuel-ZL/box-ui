<template>
<div class="realtime-table">
    <el-row class="realtime-table-footer">
        <div>
           时间 :{{ table_data.time }} &nbsp;&nbsp;&nbsp;&nbsp;
           总电流 :{{ table_data.groupVol|_toFixed(4) }} (A) &nbsp;&nbsp;&nbsp;&nbsp;
           总电压 :{{ table_data.groupCur|_toFixed(4) }} (V)
        </div>
    </el-row>
  <el-row>
    <el-table :data="table_data.battery" border fit highlight-current-row >
    <!-- <el-table :data="table_data.battery" border fit highlight-current-row  :summary-method="getSummaries" show-summary > -->
      <el-table-column  v-for='{id,prop,label,sortable,formatter} in tableThead' :key="id" :prop="prop" :label="label" :sortable="sortable" :formatter="formatter">
      </el-table-column>
    </el-table>
  </el-row>

  </div>
</template>

<script>
import { toFixed } from '@/utils/custom'
import Vue from 'vue'
Vue.filter('_toFixed', function(value, param) {
  return toFixed(value, param)
})
export default {
  name: 'realtime-table',
  props: {
    table_data: Object
  },
  data() {
    return {
      tableThead: [
        {
          prop: 'id',
          label: '序号',
          sortable: true,
          formatter: function(row, column, cellValue, index) {
            return cellValue + '节'
          }
        },
        {
          prop: 'temperature',
          label: '温度',
          sortable: true,
          formatter: function(row, column, cellValue, index) {
            return toFixed(cellValue, 4) + ' °C'
          }
        },
        {
          prop: 'voltage',
          label: '电压',
          sortable: true,
          formatter: function(row, column, cellValue, index) {
            return toFixed(cellValue, 4) + ' V'
          }
        },
        {
          prop: 'resistance',
          label: '电阻',
          sortable: true,
          formatter: function(row, column, cellValue, index) {
            return toFixed(cellValue, 4) + ' mΩ'
          }
        }
      ]
    }
  },
  methods: {
    getSummaries(param) {
      const sums = []
      sums[0] = '总电流'
      sums[1] = toFixed(this.table_data.groupVol, 4) + ' A'
      sums[2] = '总电压'
      sums[3] = toFixed(this.table_data.groupCur, 4) + ' V'
      return sums
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.realtime-table-footer{
  height: 50px;
  >div{
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
