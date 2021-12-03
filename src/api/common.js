import http from './http'

export default {
  downloadProject(data) {
    return http.post('/downLoadProject', data, '', null, 'arraybuffer')
  },
  downloadSpecification(data) {
    return http.post('/downLoadSpecification', data, '', null, 'arraybuffer')
  }
} 