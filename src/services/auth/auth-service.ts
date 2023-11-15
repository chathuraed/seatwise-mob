import WebService from '../generic/api-services';
import {ILoginRequest, ITokenRequest} from './types';

const AuthService = {
  loginUser: async (loginData: ILoginRequest) => {
    return WebService.request('auth/login', 'POST', loginData, false);
  },
  refreshToken: async (tokens: ITokenRequest) => {
    return WebService.request('auth/refresh-token', 'POST', tokens, false);
  },
};

export default AuthService;
