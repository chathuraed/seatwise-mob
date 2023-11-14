import {fork} from 'redux-saga/effects';
import appSaga from './saga/app-saga';
import authSaga from './saga/auth-saga';

export default function* rootSaga() {
  yield fork(appSaga);
  yield fork(authSaga);
}
