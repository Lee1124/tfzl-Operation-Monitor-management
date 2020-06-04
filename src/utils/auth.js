import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })//Config.tokenCookieExpires
  } else return Cookies.set(TokenKey, token)

}

export function removeToken() {
  console.log('执行了removeToken========')
  return Cookies.remove(TokenKey)
}
