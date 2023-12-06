import {call, put, takeLatest} from 'redux-saga/effects'
import {appActions} from '../reducer/app-slice'

import {searchActions} from '../reducer/search-slice'
import PassengerService from '../../services/passenger/passenger-service'

export function* getAllRoutesGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(searchActions.setLoading())
    yield put(appActions.removeErrors())

    const response = yield call(PassengerService.loadSchedules, payload)

    console.log('Get Schedule', response)
    // if (response.status === 200) {
    //   const {data} = response
    //   yield put(ownerActions.setRoutes(data))
    // } else if (response.status === 400) {
    //   let data = yield call([response, 'json'])
    //   yield put(
    //     appActions.setError({
    //       error: {
    //         title: '',
    //         message: data.Message,
    //       },
    //       type: '',
    //     }),
    //   )
    // }
  } catch (error) {
    console.log(error)
  } finally {
    yield put(searchActions.removeLoading())
  }
}

export function* passengerSaga() {
  yield takeLatest(searchActions.getSchedules, getAllRoutesGenerator)
}

export default passengerSaga
