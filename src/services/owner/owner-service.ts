import WebService from '../generic/api-services';

const OwnerService = {
  loadRoutes: async () => {
    return WebService.request('owner/routes', 'GET', {}, true);
  },
  createRoute: async (data: any) => {
    return WebService.request('owner/route', 'POST', data, true);
  },
};

export default OwnerService;
