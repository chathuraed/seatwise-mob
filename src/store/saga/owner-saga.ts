import {call, put, takeLatest} from 'redux-saga/effects';
import {appActions} from '../reducer/app-slice';
import {ownerActions} from '../reducer/owner-slice';
import OwnerService from '../../services/owner/owner-service';
import {
  IBusRequest,
  IRouteRequest,
  IScheduleRequest,
} from '../../services/owner/types';

import * as RootNavigation from '../../navigation/rootNavigation';

export function* getAllRoutesGenerator(): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.loadRoutes);

    if (response.status === 200) {
      const {data} = response;
      yield put(ownerActions.setRoutes(data));
    } else if (response.status === 400) {
      let data = yield call([response, 'json']);
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

export function* getRouteGenerator({
  payload,
}: {
  payload: any;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.loadRoute, payload);

    if (response.status === 200) {
      const {data} = response;
      console.log('Test', data);
      yield put(ownerActions.setSelectedRoute(data));
    } else if (response.status === 400) {
      let data = yield call([response, 'json']);
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
      busId: payload.busId,
      origin: payload.origin,
      destination: payload.destination,
    });

    if (response.status === 201) {
      console.log('success');
      yield put(
        appActions.showToast({
          title: 'Success',
          message: 'Route added successfully',
        }),
      );
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
export function* createScheduleGenerator({
  payload,
}: {
  payload: IScheduleRequest;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Please Wait'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.createSchedule, {
      ...(payload.scheduleId ? {scheduleId: payload.scheduleId} : {}),
      routeId: payload.routeId,
      origin: payload.origin,
      destination: payload.destination,
      start_time: payload.start_time,
      end_time: payload.end_time,
      available_at: payload.available_at,
    });

    if (response.status === 201) {
      console.log('success');
      yield put(
        appActions.showToast({
          title: 'Success',
          message: 'Schedule added successfully',
        }),
      );
      yield RootNavigation.goBack();
    } else if (response.status === 200) {
      console.log('update success');
      yield put(
        appActions.showToast({
          title: 'Success',
          message: 'Schedule updated successfully',
        }),
      );
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

export function* getAllBusesGenerator(): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.loadBuses);

    if (response.status === 200) {
      const {data} = response;
      yield put(ownerActions.setBuses(data));
    } else if (response.status === 400) {
      let data = yield call([response, 'json']);
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

export function* getBusGenerator({
  payload,
}: {
  payload: any;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.loadBus, payload);

    if (response.status === 200) {
      const {data} = response;
      console.log('bus', data);
      yield put(ownerActions.setBus(data));
    } else if (response.status === 400) {
      let data = yield call([response, 'json']);
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

export function* createBusGenerator({
  payload,
}: {
  payload: IBusRequest;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Please Wait'));
    yield put(appActions.removeErrors());

    const response = yield call(OwnerService.createBus, {
      ...(payload.busId ? {userId: payload.userId, busId: payload.busId} : {}),
      busNumber: payload.busNumber,
      model: payload.model,
      seatingCapacity: payload.seatingCapacity,
      arrangement: payload.arrangement,
      seats: payload.seats,
    });

    if (response.status === 201) {
      console.log('success');
      yield put(
        appActions.showToast({
          title: 'Success',
          message: 'Bus added successfully',
        }),
      );
      yield RootNavigation.goBack();
    } else if (response.status === 200) {
      console.log('update success');
      yield put(
        appActions.showToast({
          title: 'Success',
          message: 'Bus updated successfully',
        }),
      );
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
  yield takeLatest(ownerActions.getRoute, getRouteGenerator);
  yield takeLatest(ownerActions.createRoute, createRouteGenerator);
  yield takeLatest(ownerActions.createSchedule, createScheduleGenerator);
  yield takeLatest(ownerActions.getAllBuses, getAllBusesGenerator);
  yield takeLatest(ownerActions.getBus, getBusGenerator);
  yield takeLatest(ownerActions.createBus, createBusGenerator);
}

export default ownerSaga;
