import {call, put, takeLatest} from 'redux-saga/effects';
import {appActions} from '../reducer/app-slice';
import {ownerActions} from '../reducer/owner-slice';
import OwnerService from '../../services/owner/owner-service';
import {IRouteRequest} from '../../services/owner/types';

import * as RootNavigation from '../../navigation/rootNavigation';

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

export function* createRouteGenerator({
  payload,
}: {
  payload: IRouteRequest;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Please Wait'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.createRoute, {
      permit_id: payload.permit_id,
      origin: payload.origin,
      destination: payload.destination,
    });
    console.log('response', response.status);
    console.log('response', response.data);

    if (response.status === 201) {
      console.log('success');
      yield RootNavigation.goBack();
    } else {
      yield put(
        appActions.setError({
          error: {
            title: '',
            message: error.data.error,
          },
          type: '',
        }),
      );
    }

    // if (response.status === 200) {
    //   const {data} = response;
    //   // let data = yield call([response, 'json']);

    //   console.log('created', data);
    //   // yield put(ownerActions.setRoutes(data));
    // } else if (response.status === 400) {
    //   let data = yield call([response, 'json']);
    //   console.log('test', data);

    //   yield put(
    //     appActions.setError({
    //       error: {
    //         title: '',
    //         message: data.Message,
    //       },
    //       type: '',
    //     }),
    //   );
    // }
  } catch (error) {
    yield put(
      appActions.setError({
        error: {
          title: '',
          message: error.data.error,
        },
        type: '',
      }),
    );
  } finally {
    yield put(appActions.removeLoading());
  }
}

export function* ownerSaga() {
  yield takeLatest(ownerActions.getAllRoutes, getAllRoutesGenerator);
  yield takeLatest(ownerActions.createRoute, createRouteGenerator);
}

export default ownerSaga;
