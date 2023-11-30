import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, {AxiosResponse, AxiosRequestConfig} from 'axios'
import {addParamsToURL} from '../../util'
import moment from 'moment'
import AppService from './app-service'

interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
}

const WebService = {
  request: async <T = any>(
    url: string,
    method: string,
    requestData: any,
    secured: boolean,
    options?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> => {
    try {
      let apiUrl = AppService.getAPI() + url

      const headers: {[key: string]: string} = {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      }

      const authToken = AppService.accessToken
      if (secured && authToken) {
        headers.Authorization = authToken
      }

      let requestConfig: AxiosRequestConfig = {
        method,
        headers,
        ...options,
      }

      if (['POST', 'PUT', 'PATCH'].includes(method) && requestData) {
        requestConfig.data = requestData
      } else {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
        if (
          typeof requestData === 'object' &&
          Object.keys(requestData).length !== 0
        ) {
          apiUrl = addParamsToURL(apiUrl, requestData)
        }
      }

      const reqStartTime = moment()
      if (__DEV__) {
        console.log(
          '******************* REQUEST ******************',
          '\nURL :',
          apiUrl,
          '\nReq Start Time:',
          reqStartTime.format('HH:mm:ss'),
          '\nMethod:',
          method,
          'Header:',
          headers,
          '\nBody:',
          requestData,
          '\n*********************************************',
        )
      }

      const response: AxiosResponse<T> = await axios(apiUrl, requestConfig)

      console.log('my response', response)
      if (response.status === 401) {
        const refreshResult = await WebService.refreshToken()
        if (refreshResult) {
          return await WebService.request<T>(
            url,
            method,
            requestData,
            secured,
            options,
          ) // Add return here
        } else {
          return Promise.reject(false)
        }
      } else {
        // console.log('called > ', apiUrl, requestData, method, response);
        return response
      }
    } catch (error) {
      console.log(error)
      throw error.response
    }
  },

  refreshToken: async <T = any>(): Promise<ApiResponse<T>> => {
    try {
      const apiUrl = `${AppService.getAPI()}auth/refresh-token`
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken')

      const refreshTokenResponse = await axios.post(apiUrl, {
        token: storedRefreshToken,
      })

      console.log('refreshTokenResponse', refreshTokenResponse)

      if (refreshTokenResponse.status === 200) {
        const {token, refreshToken} = refreshTokenResponse.data

        AppService.accessToken = token
        AppService.refreshToken = refreshToken

        await AsyncStorage.setItem('authToken', token)
        await AsyncStorage.setItem('refreshToken', refreshToken)
      } else {
        // Handle error if needed
      }

      return refreshTokenResponse
    } catch (error) {
      console.log('error', error)
      throw error.response
    }
  },
}

export default WebService
