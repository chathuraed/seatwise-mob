import {call, put, takeLatest} from 'redux-saga/effects'
import {appActions} from '../reducer/app-slice'

import {searchActions} from '../reducer/search-slice'
import PassengerService from '../../services/passenger/passenger-service'

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
    console.log(error.data)
    yield put(
      appActions.showToast({
        type: 'error',
        title: 'Sorry',
        message: error.data.message,
      }),
    )
  } finally {
    yield put(searchActions.removeLoading())
  }
}

export function* passengerSaga() {
  yield takeLatest(searchActions.getSchedules, getSchedulesGenerator)
}

export default passengerSaga
