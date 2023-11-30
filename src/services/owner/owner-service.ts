import WebService from '../generic/api-services';

const OwnerService = {
  loadRoutes: async () => {
    return WebService.request('owner/routes', 'GET', {}, true);
  },
  createRoute: async (data: any) => {
    return WebService.request('owner/route', 'POST', data, true);
  },
  createSchedule: async (data: any) => {
    return WebService.request('owner/schedule', 'POST', data, true);
  },
  loadBuses: async () => {
    return WebService.request('owner/buses', 'GET', {}, true);
  },
  loadBus: async (data: any) => {
    return WebService.request('owner/bus', 'GET', data, true);
  },
  createBus: async (data: any) => {
    return WebService.request('owner/bus', 'POST', data, true);
  },
  loadRoute: async (params: any) => {
    return WebService.request('owner/route', 'GET', params, true);
  },
};

export default OwnerService;
