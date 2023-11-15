import {call, put, takeLatest} from 'redux-saga/effects';
import {appActions} from '../reducer/app-slice';
import {ownerActions} from '../reducer/owner-slice';
import OwnerService from '../../services/owner/owner-service';

export function* getAllRoutesGenerator(): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.loadRoutes);
    console.log('response', response.status);

    if (response.status === 200) {
      const {data} = response;
      // let data = yield call([response, 'json']);

      console.log('routes', data);
      yield put(ownerActions.setRoutes(data));
    } else if (response.status === 400) {
      let data = yield call([response, 'json']);
      console.log('test', data);

      yield put(
        appActions.setError({
          error: {
            title: '',
            message: data.Message,
          },
          type: '',
        }),
      );
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put(appActions.removeLoading());
  }
}

export function* ownerSaga() {
  yield takeLatest(ownerActions.getAllRoutes, getAllRoutesGenerator);
}

export default ownerSaga;
