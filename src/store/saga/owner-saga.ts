import {call, put, select, takeLatest} from 'redux-saga/effects'
import {appActions} from '../reducer/app-slice'
import {ownerActions} from '../reducer/owner-slice'
import OwnerService from '../../services/owner/owner-service'
import {
  IBusRequest,
  IRouteRequest,
  IScheduleRequest,
} from '../../services/owner/types'

import * as RootNavigation from '../../navigation/rootNavigation'
import {selectCurrentAccount} from '../reducer/auth-slice'
import {showModal} from '../reducer/modal-slice'
import {ModalType} from '../../contexts/modal-provider'

export function* getDashboardDataGenerator(): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.getDashboard)

    if (response.status === 200) {
      const {data} = response
      yield put(ownerActions.setDashboardData(data))
      // yield put(ownerActions.setRoutes(data))
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* getAllRoutesGenerator(): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.loadRoutes)

    if (response.status === 200) {
      const {data} = response
      yield put(ownerActions.setRoutes(data))
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* getRouteGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.loadRoute, payload)

    if (response.status === 200) {
      const {data} = response
      console.log('Test', data)
      yield put(ownerActions.setSelectedRoute(data))
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* createRouteGenerator({
  payload,
}: {
  payload: IRouteRequest
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Please Wait'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.createRoute, {
      permit_id: payload.permit_id,
      busId: payload.busId,
      origin: payload.origin,
      destination: payload.destination,
      price: payload.price,
    })

    if (response.status === 201) {
      console.log('success')
      yield put(
        showModal({
          type: ModalType.SUCCESS,
          title: 'Success',
          message: 'Route added successfully',
        }),
      )
      yield RootNavigation.goBack()
    } else {
      yield put(
        appActions.setError({
          error: {
            title: '',
            message: error.data.error,
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* createScheduleGenerator({
  payload,
}: {
  payload: IScheduleRequest
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Please Wait'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.createSchedule, {
      ...(payload.scheduleId ? {scheduleId: payload.scheduleId} : {}),
      routeId: payload.routeId,
      origin: payload.origin,
      destination: payload.destination,
      start_time: payload.start_time,
      end_time: payload.end_time,
      available_at: payload.available_at,
    })

    if (response.status === 201) {
      console.log('success')
      yield put(
        showModal({
          type: ModalType.SUCCESS,
          title: 'Success',
          message: 'Schedule added successfully',
        }),
      )
      yield RootNavigation.goBack()
    } else if (response.status === 200) {
      console.log('update success')
      yield put(
        showModal({
          type: ModalType.SUCCESS,
          title: 'Success',
          message: 'Schedule updated successfully',
        }),
      )
      yield RootNavigation.goBack()
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* getAllBusesGenerator(): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.loadBuses)

    if (response.status === 200) {
      const {data} = response
      yield put(ownerActions.setBuses(data))
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* getBusGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.loadBus, payload)

    if (response.status === 200) {
      const {data} = response
      console.log('bus', data)
      yield put(ownerActions.setBus(data))
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* createBusGenerator({
  payload,
}: {
  payload: IBusRequest
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Please Wait'))
    yield put(appActions.removeErrors())

    const user = yield select(selectCurrentAccount)

    const response = yield call(OwnerService.createBus, {
      ...(payload.busId ? {busId: payload.busId} : {}),
      userId: user.userId,
      busNumber: payload.busNumber,
      model: payload.model,
      seatingCapacity: payload.seatingCapacity,
      arrangement: payload.arrangement,
      seats: payload.seats,
    })

    if (response.status === 201) {
      yield put(
        showModal({
          type: ModalType.SUCCESS,
          title: 'Success',
          message: 'Bus added successfully',
        }),
      )
      yield RootNavigation.goBack()
    } else if (response.status === 200) {
      yield put(
        showModal({
          type: ModalType.SUCCESS,
          title: 'Success',
          message: 'Bus updated successfully',
        }),
      )
      yield RootNavigation.goBack()
    } else {
      yield put(
        appActions.setError({
          error: {
            title: '',
            message: error.data.error,
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* getBookingsByDateGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'))
    yield put(appActions.removeErrors())

    const response = yield call(OwnerService.loadBookingsByDate, payload)

    if (response.status === 200) {
      const {data} = response
      console.log('bus', data)
      yield put(ownerActions.setBookings(data.bookings))
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
        message: error.data.error,
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* ownerSaga() {
  yield takeLatest(ownerActions.getAllRoutes, getAllRoutesGenerator)
  yield takeLatest(ownerActions.getRoute, getRouteGenerator)
  yield takeLatest(ownerActions.createRoute, createRouteGenerator)
  yield takeLatest(ownerActions.createSchedule, createScheduleGenerator)
  yield takeLatest(ownerActions.getAllBuses, getAllBusesGenerator)
  yield takeLatest(ownerActions.getBus, getBusGenerator)
  yield takeLatest(ownerActions.createBus, createBusGenerator)
  yield takeLatest(ownerActions.getDashboardData, getDashboardDataGenerator)
  yield takeLatest(ownerActions.getBookingsByDate, getBookingsByDateGenerator)
}

export default ownerSaga
