import WebService from '../generic/api-services';
import {ILoginRequest} from './types';

const AuthService = {
  loginUser: async (loginData: ILoginRequest) => {
    return WebService.request('auth/login', 'POST', loginData, false);
  },
};

export default AuthService;
