import {fork} from 'redux-saga/effects'
import appSaga from './saga/app-saga'
import authSaga from './saga/auth-saga'
import ownerSaga from './saga/owner-saga'
import passengerSaga from './saga/passenger-saga'

export default function* rootSaga() {
  yield fork(appSaga)
  yield fork(authSaga)
  yield fork(ownerSaga)
  yield fork(passengerSaga)
}
