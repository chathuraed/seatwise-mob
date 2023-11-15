import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import {addParamsToURL} from '../../util';
import moment from 'moment';
import AppService from './app-service';

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  // Add other properties if needed
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
      let apiUrl = AppService.getAPI() + url;

      const headers: {[key: string]: string} = {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      };

      const authToken = AppService.accessToken;
      if (secured && authToken) {
        headers.Authorization = authToken;
      }

      let requestConfig: AxiosRequestConfig = {
        method,
        headers,
        ...options,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method) && requestData) {
        requestConfig.data = requestData;
      } else {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if (
          typeof requestData === 'object' &&
          Object.keys(requestData).length !== 0
        ) {
          apiUrl = addParamsToURL(apiUrl, requestData);
        }
      }

      const reqStartTime = moment();
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
        );
      }

      const response: AxiosResponse<T> = await axios(apiUrl, requestConfig);

      if (response.status === 401) {
        const refreshResult = await WebService.refreshToken();
        if (refreshResult) {
          return await WebService.request<T>(
            url,
            method,
            requestData,
            secured,
            options,
          ); // Add return here
        } else {
          return Promise.reject(false);
        }
      } else {
        console.log('called > ', apiUrl, requestData, method, response);
        return response;
      }
    } catch (error) {
      throw error.response;
    }
  },

  refreshToken: async (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      console.log('calling refresh token');
      try {
        const currentAccessToken = AppService.accessToken;
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

        const requestBody = {
          token: currentAccessToken,
          refreshToken: storedRefreshToken,
        };

        const requestHeaders = {
          accept: '*/*',
          'Content-Type': 'application/json-patch+json',
        };

        const requestOptions: AxiosRequestConfig = {
          method: 'POST',
          headers: requestHeaders,
          data: JSON.stringify(requestBody),
        };

        const refreshTokenResponse: AxiosResponse<RefreshTokenResponse> =
          await axios(AppService.getAPI() + 'Auth/Refresh', requestOptions);

        console.log('refreshTokenResponse', refreshTokenResponse);

        if (refreshTokenResponse.status === 200) {
          const responseData = refreshTokenResponse.data;

          AppService.accessToken = responseData.accessToken;
          AppService.refreshToken = responseData.refreshToken;
          await AsyncStorage.setItem('refreshToken', responseData.refreshToken);
          if (AppService.rememberMe === 'true') {
            await AsyncStorage.setItem('authToken', responseData.accessToken);
          }
          resolve(true);
        } else {
          reject(false);
        }
      } catch (error) {
        reject(false);
      }
    });
  },
};

export default WebService;
