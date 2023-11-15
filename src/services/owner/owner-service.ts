import WebService from '../generic/api-services';
import {IRouteRequest} from './types';

const OwnerService = {
  loadRoutes: async () => {
    return WebService.request('owner/routes', 'GET', {}, true);
  },
  createRoute: async (data: IRouteRequest) => {
    return WebService.request('owner/route', 'POST', data, true);
  },
};

export default OwnerService;
