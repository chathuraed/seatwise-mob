import {call, put, takeLatest} from 'redux-saga/effects'
import {appActions} from '../reducer/app-slice'

import {searchActions} from '../reducer/search-slice'
import PassengerService from '../../services/passenger/passenger-service'
import {showModal} from '../reducer/modal-slice'
import {ModalType} from '../../components/custom-modal'
import {passengerActions} from '../reducer/passenger-slice'
import {IBookingRequest} from '../../services/passenger/types'

export function* getSchedulesGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(searchActions.setLoading())
    yield put(appActions.removeErrors())

    const response = yield call(PassengerService.loadSchedules, payload)

    if (response.status === 200) {
      const {data} = response

      if (data.length) {
        yield put(searchActions.setSchedules(data))
        yield put(
          appActions.navigateToLocation({
            screen: 'Results',
          }),
        )
      }
    }
  } catch (error) {
    yield put(
      showModal({
        type: ModalType.ERROR,
        title: 'Failed',
        message: error.data.message,
      }),
    )
  } finally {
    yield put(searchActions.removeLoading())
  }
}

export function* createBookingGenerator({
  payload,
}: {
  payload: IBookingRequest
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Please Wait'))
    yield put(appActions.removeErrors())

    const response = yield call(PassengerService.createBooking, {
      booking_date: payload.booking_date,
      schedule_id: payload.schedule_id,
      bus_id: payload.bus_id,
      price_per_seat: payload.price_per_seat,
      passenger_id: payload.passenger_id,
      selected_seats: payload.selected_seats,
    })

    if (response.status === 201) {
      console.log('success')
      // yield put(
      //   appActions.showToast({
      //     title: 'Success',
      //     message: 'Schedule added successfully',
      //   }),
      // )
      yield put(
        showModal({
          type: ModalType.SUCCESS,
          title: 'Success',
          message: 'Booking created successfully',
        }),
      )
      yield put(
        appActions.navigateToLocation({
          screen: 'Search',
        }),
      )
    } else if (response.status === 200) {
      console.log('update success')
      yield put(
        appActions.showToast({
          title: 'Success',
          message: 'Schedule updated successfully',
        }),
      )
      // yield RootNavigation.goBack()
    } else {
      yield put(
        showModal({
          type: ModalType.ERROR,
          title: 'Failed',
          message: error.data.error,
        }),
      )
    }
  } catch (error) {
    yield put(
      showModal({
        type: ModalType.ERROR,
        title: 'Failed',
        message: error.data.message,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* getBookingsGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'))
    yield put(appActions.removeErrors())

    const response = yield call(PassengerService.getBookings)

    if (response.status === 200) {
      const {data} = response
      console.log('Test', data)
      yield put(passengerActions.setBookings(data.bookings))
    } else if (response.status === 400) {
      let data = yield call([response, 'json'])
      yield put(
        appActions.setError({
          error: {
            title: '',
            message: data.message,
          },
          type: '',
        }),
      )
    }
  } catch (error) {
    yield put(
      showModal({
        type: ModalType.ERROR,
        title: 'Failed',
        message: error.data.message,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* passengerSaga() {
  yield takeLatest(searchActions.getSchedules, getSchedulesGenerator)
  yield takeLatest(passengerActions.createBooking.type, createBookingGenerator)
  yield takeLatest(passengerActions.getBookings, getBookingsGenerator)
}

export default passengerSaga
