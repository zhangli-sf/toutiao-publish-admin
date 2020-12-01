/*
** 用户相关请求模块
*/
import request from '@/utils/request.js'
export const login = (data) => {
  return request({
    methods: 'POST',
    url: '/mp/v1_0/authorizations',
    // data请求体
    // data:data
    data
  })
}
