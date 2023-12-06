import WebService from '../generic/api-services'

const PassengerService = {
  loadSchedules: async body => {
    return WebService.request('passenger/schedules', 'POST', body, true)
  },
}

export default PassengerService
