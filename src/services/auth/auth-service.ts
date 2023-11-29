import WebService from '../generic/api-services';
import {ILoginRequest, ITokenRequest} from './types';

const AuthService = {
  loginUser: async (loginData: ILoginRequest) => {
    return WebService.request('auth/login', 'POST', loginData, false);
  },
  refreshToken: async () => {
    return WebService.refreshToken();
  },
};

export default AuthService;
