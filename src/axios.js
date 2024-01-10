import axios from 'axios'
import config from './config'
import { unAuthorized } from './helper'

const instance = axios.create({
  baseURL: config.API_URL
})

instance.interceptors.response.use(response => response, (error) => {
  if (error.response && error.response.status === 401) {
    unAuthorized()
  }
  return Promise.reject(error)
})

export default instance


