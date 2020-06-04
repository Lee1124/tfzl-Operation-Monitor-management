import request from '@/utils/request'

export function getImgCode() {
  return request({
    url: 'api/user/sliding',
    method: 'get'
  })
}

export function login(userName, passWord, verifyCode) {
  return request({
    url: 'api/user/login',
    method: 'post',
    data: {
      userName,
      passWord
    }
  })
}

export function getUserInfo() {
  return request({
    url: 'api/user/getUserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'api/user/logout',
    method: 'post'
  })
}


