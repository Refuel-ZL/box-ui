import request from '@/utils/request'

export function listAll() {
  return request({
    url: '/batteryDemo/listAll',
    method: 'get',
    params: ''
  })
}

export function realtime(batteryGroup) {
  return request({
    url: '/batteryDemo/batteryGroup/' + batteryGroup + '/realtime',
    method: 'get',
    params: ''
  })
}

export function config(batteryGroup, type, params) {
  return request({
    url: '/batteryDemo/batteryGroup/' + batteryGroup + '/config/' + type,
    method: 'get',
    params: params
  })
}
