import WebService from '../generic/api-services'
import {ILoginRequest} from './types'

const AuthService = {
  loginUser: async (loginData: ILoginRequest) => {
    return WebService.request('auth/login', 'POST', loginData, false)
  },
  registerUser: async (registrationData: any) => {
    return WebService.request('auth/register', 'POST', registrationData, false)
  },
  refreshToken: async () => {
    return WebService.refreshToken()
  },
}

export default AuthService
