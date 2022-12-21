import { parseCookies } from 'nookies'
import axios from 'axios'

const parsedToken = parseCookies()
export const interceptor = axios.create()

interceptor.interceptors.request.use(
  async config => {
    const token = parsedToken.JWTtoken
    if (token) {
      config.headers!.authorization = 'Bearer ' + token
    }
    return config
  }
)