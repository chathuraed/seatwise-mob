import {takeLatest} from 'redux-saga/effects';
import * as RootNavigation from '../../navigation/rootNavigation';
import {appActions} from '../reducer/app-slice';

export function* navigateToLocationGenerator({payload}) {
  RootNavigation.navigate(payload.screen, payload.params);
}

export function* appSaga() {
  yield takeLatest(
    appActions.navigateToLocation.type,
    navigateToLocationGenerator,
  );
}

export default appSaga;
