import WebService from '../generic/api-services'
import {IBookingRequest} from './types'

const PassengerService = {
  loadSchedules: async (body: any) => {
    return WebService.request('passenger/schedules', 'POST', body, true)
  },
  createBooking: async (body: IBookingRequest) => {
    return WebService.request('passenger/book-seat', 'POST', body, true)
  },
  getBookings: async () => {
    return WebService.request('passenger/bookings', 'GET', {}, true)
  },
}

export default PassengerService
