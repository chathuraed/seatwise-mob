import Config from 'react-native-config';

const AppService = {
  accessToken: '',
  refreshToken: '',
  rememberMe: 'false',
  getAPI: () => {
    return `${Config.API_URL}/api/`;
  },
};

export default AppService;
