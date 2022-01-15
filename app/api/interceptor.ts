import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Router from 'next/router'
import { API_BASE_URL } from '../constants'

// Configure request params
const config: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 6000,
}
const service: AxiosInstance = axios.create(config)
const ENTRY_ROUTE: string = '/'
const PUBLIC_REQUEST_KEY: string = 'public-request'

// Intercept request
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers && !config.headers[PUBLIC_REQUEST_KEY]) {
      Router.push(ENTRY_ROUTE)
    }

    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  },
)

// Intercept response
service.interceptors.response.use((response: AxiosResponse) => {
  return response.data
})

export default service
